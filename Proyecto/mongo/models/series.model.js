let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

var seriesSchema   = new Schema({
    id_num: Number,
    name: String,
    description: String,
    category: String,
    path_dir: String,
    extension: String,
    season: String,
    episode: String
});

module.exports = mongoose.model('Series', seriesSchema);