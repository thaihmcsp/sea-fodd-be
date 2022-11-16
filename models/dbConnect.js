const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seaFood');
module.exports = mongoose;