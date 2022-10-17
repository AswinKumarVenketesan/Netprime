const {
  movieCreate,
  movieGetAll,
  movieGetOne,
  movieUpdate,
  movieDelete,
  popularMovies,
  searchMovies,
  thrillerGenre,
  feelgoodGenre,
} = require("../controllers/movie");

module.exports = [
  {
    method: "POST",
    path: "/movie/create",
    handler: movieCreate,
  },
  {
    method: "GET",
    path: "/movie/getAll",
    handler: movieGetAll,
  },
  {
    method: "GET",
    path: "/movie/getOne/{id?}",
    handler: movieGetOne,
  },
  {
    method: "PATCH",
    path: "/movie/update/{id?}",
    handler: movieUpdate,
  },
  {
    method: "DELETE",
    path: "/movie/delete/{id?}",
    handler: movieDelete,
  },
  {
    method: "GET",
    path: "/movie/popularmovies",
    handler: popularMovies

  },    
  {
  method: "GET",
  path: "/movie/{moviename?}",
  handler: searchMovies

},
{
  method: "GET",
  path: "/movie/genre/thriller",
  handler: thrillerGenre
},
{
  method: "GET",
  path: "/movie/genre/romance",
  handler: feelgoodGenre
}
];
