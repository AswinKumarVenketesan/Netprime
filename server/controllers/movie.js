const Movie = require("../models/movie");
const User = require("../models/user");
const redis = require("../redis/redis");
const client = require("../elasticsearch/elasticsearch");
const Queue = require("bull");
const path = require("path");
const Sequelize = require("sequelize");
const { DatabaseError } = require("sequelize");
const Op = Sequelize.Op;
const os = require('os')
const {MovieFindAll,MovieCreate,MovieFindByPk,MovieUpdate,MovieDelete} = require("../utils/dbquery")


const syncMoviesToWorkerQueue = new Queue(
  "moviesQueue",
  "redis://0.0.0.0:6379"
);

const movieCreate = async (req, reply) => {
  try {
    const movie = await MovieCreate({
      userId: req.userId,
      moviename: req.payload.moviename,
      year: req.payload.year,
      imdb: req.payload.imdb,
      genre: req.payload.genre,
      director: req.payload.director,
      image_url: req.payload.image_url,
      youtube_url: req.payload.youtube_url
    });
    syncMoviesToWorkerQueue.add({ movie });
    redis.del("allMovies");
    const savemovie = await movie.save()
    if(savemovie)
    reply({
      message: "Movie added successfully",
      data: movie,
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

const movieGetAll = async (request, reply) => {
  try {
    // const totalCount = await Movie.count()
    // const pagination = new Paginator(request, totalCount)

        const movies = await MovieFindAll({
        })
        reply({ movies, hostname: os.hostname() });
      
    }catch (error) {
    reply({ Error: error.message});
  }
};

const movieGetOne = async (req, reply) => {
  try {
    redis.get("allMovies", async function (err, fetchedMovie) {
      if (err) return reply({ Error: error.message });
      if (fetchedMovie) {
        return reply({ movie: JSON.parse(fetchedMovie), redis: true });
      }
      const movie = await MovieFindByPk(req.userId);
      redis.set("allMovies", JSON.stringify(movie));
      reply({ movie, redis: false });
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

const movieUpdate = async (req, reply) => {
  try {
    const movie = await MovieUpdate(req.payload, {
      where: { id: req.params.id },
    });
    const movieById = await MovieFindByPk(req.params.id);
    const movies = await MovieFindAll();
    redis.set("allMovies", JSON.stringify(movieById));
    redis.set("allMovies", JSON.stringify(movies));
    reply({
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

const movieDelete = async (req, reply) => {
  try {
    const movie = await MovieDelete({ where: { id: req.params.id } });
    const movies = await MovieFindAll();
    redis.del("allMovies");
    redis.set("allMovies", JSON.stringify(movies));
    reply({
      message: "Movie deleted successfully",
      data: movie,
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

const searchMovies = async (req, reply) => {
  try{
    const {moviename} = req.params
    const data = await MovieFindAll({
      where: {
      moviename:{
        [Op.like]: `%${moviename}%`
      }
    }})
    reply(data)
   } catch(error){
      reply ({ Error: error.message })
    }
  }
const thrillerGenre = async (req, reply) => {
  try{
    const thrillermovies = await MovieFindAll({where:{
      genre:"thriller"
    }})
    reply({thrillermovies})
  }catch(error){
    reply ({ Error: error.message })
  }
}
const feelgoodGenre = async (req, reply) => {
  try{
    const romancemovies = await MovieFindAll({where:{
      genre:"romance"
    }})
    reply({romancemovies})
  }catch(error){
    reply ({ Error: error.message })
  }
}
const popularMovies = async (req, reply) => {
  try{
    const searchmovies = await MovieFindAll({
      limit: 5,
      order:[["imdb","DESC"]]
    })
    reply({searchmovies})
  }catch(error){
    reply ({ Error: error.message})
  }
}

module.exports = {movieCreate,thrillerGenre,popularMovies,thrillerGenre,searchMovies,movieGetAll,movieGetOne,movieUpdate,movieDelete,feelgoodGenre};
