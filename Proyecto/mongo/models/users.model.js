let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

var usersSchema   = new Schema({
    id_num: Number,
    username: String,
    email: String,
    password: String,
    state: String
});

module.exports = mongoose.model('Users', usersSchema);