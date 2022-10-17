const redisquery = require('../redis/redis');
const logger = require('../logger/index')
const {movieUpdate,movieGetOne} = require('../controllers/movie')

async function redisMovieGet(type, key, callFunction){
    try{
        const redis = await redisquery();
        console.log(data);
        if(data != null){
            console.log("cache hit !!");
        }else{
            console.log("cache Miss !!")
            redis.quit;
            return JSON.parse(dataQuery);
        }
        }catch(err){
            logger.log("error","connection to redis" + err);
        }

    }

    module.exports = { redisMovieGet}