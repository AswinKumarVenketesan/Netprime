const Movie = require('../models/movie');
const userModel = require('../models/user')
exports.MovieFindAll = async () => {
    const data = await Movie.findAll()
    return data
}

exports.MovieCreate = async () => {
    const data = await Movie.create()
    return data
}

exports.MovieFindByPk = async () => {
    const data = await Movie.findByPk()
    return data
}

exports.MovieUpdate = async () => {
    const data = await Movie.update()
    return data
}

exports.MovieDelete = async () => {
    const data = await Movie.destroy()
    return data
}

exports.UserFindOne = async () => {
    const data = await userModel.findOne()
    return data
}

exports.UserCreate = async () => {
    const data = await userModel.create()
    return data
}
