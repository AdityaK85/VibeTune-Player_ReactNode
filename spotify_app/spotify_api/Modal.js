const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const audioSchema = new Schema({
    name: String,
    filePath: String,
    fk_artish_id: mongoose.Schema.Types.ObjectId,
    file_mime_type: String,
    upload_date: Date,
  }, { collection: 'audio_collection' });

const artistSchema = new Schema({
  profile_image : String,
  file_mime_type: String,
  artist_name : String,
  fk_category_id : mongoose.Schema.Types.ObjectId,
  created_date: Date,
}, {collection: 'artist_collection'})

const categorySchema = new Schema({
  artist_type : String
}, {collection: 'category_collection'})


// Modal Exports

module.exports = {
  AudioModal: mongoose.model("AudioModal", audioSchema),
  ArtistModal: mongoose.model("ArtistModal", artistSchema),
  CategoryModal: mongoose.model("CategoryModal", categorySchema)
};