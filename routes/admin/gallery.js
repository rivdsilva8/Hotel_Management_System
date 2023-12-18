// admin here can add, delete, and see all the photos he want to keep in the gallery page:
// GET all, POST, DELETE
// routes/gallery.js
import express from 'express';
import multer from 'multer';
import { uploadImageToFirebase, deleteImageFromFirebase, saveImageDetailsToMongoDB, GetAllFromMongoDB, deleteImageFromMongoDB} from '../../data/gallery.js';

const router = express.Router();
const upload = multer();

router.get("/", async (req, res) => {
  console.log("in gallery routes");
  try {
    let Adminimages = await GetAllFromMongoDB();
    console.log(Adminimages);
    res.render("./Admin/adminGallery/adminGallery", {
      title: "admin gallery manipulation",AdminLink: Adminimages
    });
  } catch (e) {}
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const downloadURL = await uploadImageToFirebase(req.file);
    const imageData = {
        filename: req.file.originalname,
        // roomNumber: req.body.roomNumber,
        // roomName: req.body.roomName,
        // roomPrice: req.body.roomPrice,
        url: downloadURL
    }
    const mongoId = await saveImageDetailsToMongoDB(imageData);
    res.json({ message: "Image uploaded successfully", url: downloadURL, mongoId: mongoId, fileName: req.file.originalname });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/delete', async (req, res) => {
  try {
    const fileName = req.body.fileName;
    let deletedData = await deleteImageFromMongoDB(fileName);
    if (!deletedData.deleted) {
      return res.status(404).send(deletedData);
    }
      res.send({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;

