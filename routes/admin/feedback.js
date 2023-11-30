// admin can see all the feedback and if he wants he can delete it
// if possible he can reply to the feedback
// and the ratings should be from 0 - 10
import { Router } from "express";
import feedbackData from "../../data/feedback.js";
const router = Router();
router
  .route("/")
  .get(async (req, res) => {
    //get all feedback
    return res.render("./login/UserLogin");
  })
  .post(async (req, res) => {
    try {
      //post one feedback
      const feedbackPostData = req.body;
      if (!feedbackPostData || Object.keys(feedbackPostData).length === 0) {
        return res
          .status(400)
          .json({ error: "There are no fields in the request body" });
      }

      const { guestName, bookingId, email, rating, comment } = feedbackPostData;
      //validation / 400 error
      //trimming

      const newFeedback = await feedbackData.create(
        guestName,
        bookingId,
        email,
        rating,
        comment
      );
      res.json(newFeedback);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .render("./login/UserLogin", { error: e.error, title: "login" });
    }
  });

export default router;
