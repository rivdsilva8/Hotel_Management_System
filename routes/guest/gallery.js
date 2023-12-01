import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./guest/guestGallery/gallery", {
      title: "guest Gallary page",
    });
  } catch (e) {}
});

export default router;