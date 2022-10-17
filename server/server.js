"use strict";
const path = require("path");
const Hapi = require("hapi");
const HapiAuthCookie = require("hapi-auth-cookie");
require("./bullmq/index");
require("./elasticsearch/elasticsearch");
const Auth = require("./routes/auth");
const Movie = require("./routes/movie");
const logger = require("./logger/index")
const Users = require("./models/user");
const Sessions = require("./models/session");
const Movies = require("./models/movie");

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, "public"),
      },
    },
  },
});

server.connection({
  port: 8050,
  host: "0.0.0.0",
  routes: {
    cors: true,
  },
});

server.register(require("hapi-auth-cookie"), (err) => {
  if (err) {
    throw err;
  }

  server.auth.strategy("session", "cookie", true, {
    ttl: 3 * 24 * 60 * 60 * 1000,
    password: "password-should-be-32-characters",
    cookie: "sessionId",
    redirectTo: "/",
    isSecure: false,
    validateFunc: async function (req, session, callback) {
      const account = await Sessions.findOne({
        where: {
          id: session.sId,
        },
        include: Users,
      });

      if (!account) {
        return callback(err, false);
      }
      req.userId = session.userId;
      return callback(null, true);
    },
  });
  server.route([...Movie, ...Auth]);

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
    logger.log("info",`Server running at: ${server.info.uri}`)
  });
});

server.state("session", {
  ttl: 3 * 24 * 60 * 60 * 1000,
  isSecure: true,
  isHttpOnly: true,
  encoding: "base64json",
  clearInvalid: false,
  strictHeader: true,
});

// Relationship & Create table

const {sequelize} = require("./database/db");

Users.hasMany(Sessions, { onDelete: "cascade" });
Sessions.belongsTo(Users);

Users.hasMany(Movies, { onDelete: "cascade" });
Movies.belongsTo(Users);

sequelize
  .sync({ alter: true })
  .then((response) => {})
  .catch((err) => {
    console.log(err);
  });
