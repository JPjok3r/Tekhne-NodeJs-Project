let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

var moviesSchema   = new Schema({
    id_num: Number,
    name: String,
    description: String,
    category: String,
    path_dir: String,
    extension: String
});

module.exports = mongoose.model('Movies', moviesSchema);