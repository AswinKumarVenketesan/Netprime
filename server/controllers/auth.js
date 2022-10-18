const userModel = require("../models/user");
const Session = require("../models/session");
const logger = require("../logger/index");
// const { hash } = require("bcryptjs");
const bcrypt = require("bcrypt");
const { hash } = require("bcryptjs");
const os = require('os')
const {UserFindOne,UserCreate} = require('../utils/dbquery')


const registerUser = async (req, reply) => {
  try {
    const {username,email,password} = req.payload
    const user = await UserFindOne({
      where: {email},
    });
    if (!user) return reply({ message: "User already registered" });
    bcrypt.hash(password, 10, async(err, hash) => {
    await UserCreate({
        username: username,
        email: email,
        password: hash,

      });
    logger.log("info","User registered successfully")
    reply({message: "User registered successfully",data: user,})
  })
}catch (error) {
    logger.log("error"),{ message: error.message }
    return reply({ message: error.message });
  }
};

const loginUser = async (req, reply) => {
  try {
    const user = await UserFindOne({
      where: {username:req.payload.username},
    });
    if (!user) {
      return reply({ message: "Username or Password is Invalid" });
    } else {
      bcrypt.compare(req.payload.password,user.password)
      await user.update({isLoggedIn: !user.isLoggedIn}, {where: {id: req.userId}});
      let session = await Session.create({ status: "active" });
      user.addSession(session);
      req.cookieAuth.set({ sId: session.id, userId: user.id });
      logger.log("info","Login Successfull")
      reply({ message: "Login Successfull", data : user });
    }
  } catch (error) {
    return reply({ message: error.message });
  }
};

const isAuth = (req, reply) => {
  try {
    if (req.auth.isAuthenticated) {
      return reply({ message: "Authenticated" });
    }
  } catch (error) {
    return reply({ message: error.message });
  }
};

const logoutUser = async (req, reply) => {
  try {
    let user = await UserFindOne({where: {id: req.userId}});
    console.log("IDDD", req.userId);
    req.cookieAuth.clear();
    await user.update({isLoggedIn: !user.isLoggedIn}, {where: {id: req.userId}});
    return reply({ message: "Logout Successfull" });
  } catch (error) {
    return reply({ message: error.message });
  }
};

const health = async (req, reply) => {
  try{
    return reply({message:"ok" , hostname: os.hostname()})
  }catch(error){
    return reply ({message: error.message})
  }
}




module.exports = { registerUser, loginUser, isAuth, logoutUser,health };
