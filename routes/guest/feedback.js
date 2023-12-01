import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./guest/guestFeedback/feedback", {
      title: "guest feedback page",
    });
  } catch (e) {}
});

export default router;