// admin here can add, delete, and see all the photos he want to keep in the gallery page:
// GET all, POST, DELETE

import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./Admin/adminGallery/adminGallery", {
      title: "admin gallery manipulation",
    });
  } catch (e) {}
});

export default router;
