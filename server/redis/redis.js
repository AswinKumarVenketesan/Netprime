const { createClient } = require("redis");
const logger = require("../logger/index")

const client = createClient(
  {url: "redis://host.docker.internal:6379"}
  );

client.on("error", (err) => {
  console.log("redis client error: ", err);
  logger.log("error","redis client error: ", err)
});

module.exports = client;
