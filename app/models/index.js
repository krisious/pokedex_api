const dbconfig = require('../config/database');
const mongoose = require('mongoose');

module.exports = {
    mongoose, 
    url: dbconfig.url,
    pokemon: require('./pokemon.model')(mongoose),
}