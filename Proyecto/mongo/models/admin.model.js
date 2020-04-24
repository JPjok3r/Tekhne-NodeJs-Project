let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

var adminSchema   = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Admin', adminSchema);