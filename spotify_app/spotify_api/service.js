const modal = require("./Modal");
const mongoose = require('mongoose');

// Audio Modal 
exports.getAllAudio = async (id = null, fk_artish_id = null) => {
    if (id) { return await modal.AudioModal.findById(id) }
    if (fk_artish_id) { return await modal.AudioModal.find({ fk_artish_id: new mongoose.Types.ObjectId(fk_artish_id) }) }
    return await modal.AudioModal.find();
};

exports.createAudio = async (audio) => {
    return await modal.AudioModal.create(audio);
};

exports.getAudioById = async (id) => {
    return await modal.AudioModal.findById(id);
};

exports.updateAudio = async (id, audio) => {
    return await modal.AudioModal.findByIdAndUpdate(id, audio, { new: true });
};

exports.deleteAudio = async (id) => {
    return await modal.AudioModal.findByIdAndDelete(id);
};

//  +++++++++++++++++++++++++++++++NEW ARTIST MODAL++++++++++++++++++++++++++++++++++++++++

exports.createArtist = async (artist) => {
    return await modal.ArtistModal.create(artist)
}

//  +++++++++++++++++++++++++++++++NEW CATEGORY MODAL++++++++++++++++++++++++++++++++++++++++

exports.createCategory = async (category) => {
    return await modal.CategoryModal.create(category)
}

exports.getCategories = async (id = null) => {
    if (id) {  return await modal.CategoryModal.findById(id) }
    return await modal.CategoryModal.find();
}

exports.deleteCategory = async (id) => {
    return await modal.CategoryModal.findOneAndDelete(id)
}

//  +++++++++++++++++++++++++++++++NEW ARTIST MODAL++++++++++++++++++++++++++++++++++++++++

exports.createArtist = async (artist) => {
    return await modal.ArtistModal.create(artist);
}

exports.getArtist = async (id = null) => {
    if (id) { return await modal.ArtistModal.findById(id) }
    return await modal.ArtistModal.find()
}