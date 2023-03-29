var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Data', SongSchema);
