// admin can see all the feedback and if he wants he can delete it
// if possible he can reply to the feedback
// and the ratings should be from 0 - 10
import { Router } from "express";
import feedbackData from "../../data/feedback.js";
const router = Router();
import * as help from "../../helpers.js";
router
  .route("/")
  .get(async (req, res) => {
    //get all feedback
    let allFeedback = await feedbackData.getAll();
    res.render("./Admin/adminFeedback/feedback", {
      title: "Admin feedback mainpulation",
      feedback: allFeedback,
    });
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
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      let id = req.params.feedbackId;
      help.checkId(id);
      let feedbacks = await feedbackData.delete(id);
      res.json(feedbacks);
    } catch (e) {
      if (e === "Error: invalid object ID") {
        res.status(400).json({ error: e });
      } else {
        res.status(404).json({ error: e });
      }
    }
  });

router.route("/:feedbackId").delete(async (req, res) => {
  // Delete specific feedback
  try {
    let id = req.params.feedbackId;
    help.checkId(id);
    let feedbacks = await feedbackData.delete(id);
    if (feedbacks.deleted) {
      res.json({ message: `Feedback with ID ${id} deleted successfully` });
    } else {
      res.status(404).json({ error: `Feedback with ID ${id} not found` });
    }
  } catch (e) {
    if (e === "Error: invalid object ID") {
      res.status(400).json({ error: e });
    } else {
      res.status(500).json({ error: e.message });
    }
  }
});
export default router;
