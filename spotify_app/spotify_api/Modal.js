const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const audioSchema = new Schema({
    name: String,
    filePath: String,
    musicType: String,
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

const adminLoginSchema = new Schema({
  email : String,
  password : String
}, {collection: 'admin_login_collection'})


const userLoginSchema = new Schema({
  email : String,
  password : String
}, {collection: 'user_login_collection'})


// Modal Exports

module.exports = {
  AudioModal: mongoose.model("AudioModal", audioSchema),
  ArtistModal: mongoose.model("ArtistModal", artistSchema),
  CategoryModal: mongoose.model("CategoryModal", categorySchema),
  AdminLoginModal: mongoose.model("AdminLoginModal", adminLoginSchema),
  UserLoginModal: mongoose.model("userLoginSchema", userLoginSchema)
};

const AdminLogin = mongoose.model("AdminLogin", adminLoginSchema);

// Insert Admin Credentials
async function insertAdmin() {
  try {
    const admin = new AdminLogin({
      email: "admin@admin.com",
      password: "admin123"
    });

    const result = await admin.save();
    console.log("Admin inserted successfully:", result);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting admin:", error);
  }
}
