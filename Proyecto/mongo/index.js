'use strict';

let mongoose = require ('mongoose');
//import { FlightSchema } from './models/flight.model';
let schemamovies = require('./models/movies.model');
let schemaseries = require('./models/series.model');
let schemausers = require('./models/users.model');
let schemaadmin = require('./models/admin.model');

mongoose.Promise = global.Promise;

//This is not used in these samples, but will be used for testing purposes only
function createConnection(config, onError) {
  let dbconnection = mongoose.createConnection(config.uri, config.options);
  dbconnection.on('error', onError);
  return dbconnection;
}

function connect(config, onError) {
  mongoose.connect(config.uri, config.params);
  mongoose.connection.on('error', onError);
}

module.exports.createConnection = createConnection;
module.exports.connect = connect;
module.exports.Movies = mongoose.model('Movies', schemamovies.moviesSchema);
module.exports.Series = mongoose.model('Series', schemaseries.seriesSchema);
module.exports.Users = mongoose.model('Users', schemausers.usersSchema);
module.exports.Admin = mongoose.model('Admin', schemaadmin.adminSchema);

