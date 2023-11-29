// admin can see all the feedback and if he wants he can delete it
// if possible he can reply to the feedback
// and the ratings should be from 0 - 10
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./Admin/adminFeedback/feedback", {
      title: "admin feedback manipulation",
    });
  } catch (e) {}
});

export default router;
