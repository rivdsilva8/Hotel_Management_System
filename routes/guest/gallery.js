import { Router } from "express";
import { GetAllFromMongoDB } from "../../data/gallery.js";
const router = Router();

router.get("/", async (req, res) => {
  try {

    let images = await GetAllFromMongoDB();
    res.render("./guest/guestGallery/gallery", {
      title: "guest Gallary page",link: images
    });
  } catch (e) {
    return res.status(500).render('./error',{title: "Error Page",error:e});
  }
});



export default router;