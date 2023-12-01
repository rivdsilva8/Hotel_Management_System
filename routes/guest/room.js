import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./guest/guestRoom/room", {
      title: "guest Room page",
    });
  } catch (e) {}
});

export default router;