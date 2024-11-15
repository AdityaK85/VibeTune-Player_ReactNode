const express = require('express')
const cors = require('cors');
const { connect, uri } = require('./db_conn');
const { ObjectId } = require('mongodb');
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const service = require('./service');
const { Server } = require('http');


const image_upload = multer({ storage:multer.memoryStorage() });
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/artist_profile', express.static(path.join(__dirname, 'artist_profile')));

// Connect to MongoDB
async function runServer() {
  try {
      await connect();
      console.log("MongoDB Connection established");

      const PORT = 8000;
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1); // Exit the process if the connection fails
  }
}

runServer();

// ################################################ CHECK DIR #####################################

const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const profileUploadDir = path.join(__dirname, '/artist_profile');
const audioUploadDir = path.join(__dirname, '/uploads');

ensureDirectoryExistence(profileUploadDir);
ensureDirectoryExistence(audioUploadDir);

// ################################################ ARTIST CATEGORY API #####################################

// Save Artist 
app.post("/api/save_category", async (req, res) => {
    const { category } = req.body;
    const newCategory = { artist_type: category };
    try {
      await service.createCategory(newCategory); 
      return res.status(200).json({ message: "Artist Category Saved Successfully" });
    } catch (error) {
      console.error('Error saving audio:', error);
      return res.status(500).json({ message: "Failed to save music", error });
    }
} )


// Get Artist Category 
app.post("/api/get_category", async (req, res) => {
    var category_list = await service.getCategories();
    res.status(200).json({ 'message' : 'Artist list recived', 'payload': category_list })
})

// Delete Artist
app.post("/api/delete_artist",  async (req, res) => {
  const { category_id } = req.body;
  await service.deleteCategory(category_id);
  res.status(200).json({'message':'Deleted Successfully'})
} )


// ################################################ ARTIST PROFILE API #####################################

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'artist_profile/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload_profile = multer({ storage: profileStorage });
app.post("/api/save_artists_user", upload_profile.single('profile_image'), async (req, res) => {
  const { artist_name, category_id } = req.body;
  const profile_image = req.file;
  var isExistsCategory = await service.getCategories(category_id);
  if (isExistsCategory) {
    const newArtist = {
      artist_name: artist_name,
      profile_image: profile_image.path,
      fk_category_id: new mongoose.Types.ObjectId(category_id),
      file_mime_type: profile_image.mimetype,
      created_date: new Date(),
    };
    try { 
      await service.createArtist(newArtist)
      return res.status(200).json({ message: "New Artists Added." });
    } catch (error) {
      console.error('Error saving audio:', error);
      return res.status(500).json({ message: "Failed to save music", error });
    }
  }
})

app.post("/api/get_artists_profile_list", async (req, res) => {
  var artist_list = await service.getArtist();
  res.status(200).json({'message':'Success', 'payload': artist_list}) 
} )

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload_file = multer({ storage });
app.post("/api/save_new_music", upload_file.single("music_file"), async (req, res) => {
  const { fk_artish_id, music_name } = req.body;
  const musicFile = req.file;
  if (!musicFile ) {
    return res.status(400).json({ message: "Error in uploading audio file" });
  }
  const newAudio = {
    name: music_name,
    filePath: musicFile.path,
    fk_artish_id: new mongoose.Types.ObjectId(fk_artish_id),
    file_mime_type: musicFile.mimetype,
    upload_date: new Date(),
  };
  try {
    await service.createAudio(newAudio); 
    return res.status(200).json({ message: "Music Added Successfully" });
  } catch (error) {
    console.error('Error saving audio:', error);
    return res.status(500).json({ message: "Failed to save music", error });
  }
});

const MEDIA_BASEURL = 'http://localhost:8000'

// Retrive music list
app.post("/api/music_list", async (req, res) => {
  const { type  } = req.body;
  const musicList = await service.getAllAudio();

  const change_dict = await Promise.all(
    musicList.map(async (music) => {
      const artist  = await service.getArtist(music.fk_artish_id) ;
      const response_dict = {
        ...music.toObject(),
        audio_file : `${MEDIA_BASEURL}/${music.filePath.replace(/\\/g, '/')}`,
        artist_id : artist ? artist._id : null,
        artist_name : artist ? artist.artist_name : 'Unknown Artist',
        artist_image :  `${MEDIA_BASEURL}/${artist.profile_image.replace(/\\/g, '/')}`, 
      }
      return response_dict;
    })
  )
  return res.status(200).json({message:'Music List', payload : change_dict})
})


// Delete Audio
app.post("/api/delete_audio", async (req, res) => {
  const { audio_id } = req.body;
  await service.deleteAudio(audio_id);
  return res.status(200).json({message : 'Audio Removed'})
} )

// Get audio data 
app.post("/api/get_audio_by_id" , async (req, res) => {
  const { audio_id } = req.body;
  const audioDetail = await service.getAudioById(audio_id);
  const return_dict = {
    ...audioDetail.toObject(),
    'audio_file' : `${MEDIA_BASEURL}/${audioDetail.filePath.replace(/\\/g, '/')}`,
  }
  return res.status(200).json({'payload': return_dict})
} )

// Get audio list by artist ID 
app.post("/api/get_audio_list_by_artist_id" , async (req, res) => {
  const { artist_id } = req.body;
  const musicList = await service.getAllAudio(null, artist_id);
  const artistObj  = await service.getArtist(artist_id) ;
  const artisttype  = await service.getCategories(artistObj.fk_category_id.toHexString()) ;
  const return_artist = {
    ...artistObj.toObject(),
    'artist_type' : artisttype ? artisttype.artist_type : 'Unknown Artist',
    'artist_image' :  `${MEDIA_BASEURL}/${artistObj.profile_image.replace(/\\/g, '/')}`,
  }
  const change_dict = await Promise.all(
    musicList.map(async (music) => {
      const artist  = await service.getArtist(music.fk_artish_id) ;
      const artisttype  = await service.getCategories(artist.fk_category_id.toHexString()) ;
      const response_dict = {
        ...music.toObject(),
        audio_file : `${MEDIA_BASEURL}/${music.filePath.replace(/\\/g, '/')}`,
        artist_id : artist ? artist._id : null,
        artist_name : artist ? artist.artist_name : 'Unknown Artist',
        artist_image :  `${MEDIA_BASEURL}/${artist.profile_image.replace(/\\/g, '/')}`, 
        artist_type : artisttype ? artisttype.artist_type : 'Unknown Artist',
      }
      return response_dict;
    })
  )
  const final_response = {
    artist_details: return_artist,
    music_list: change_dict,
  };0
  return res.status(200).json({'payload': final_response})
} )