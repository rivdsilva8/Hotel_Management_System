import { Router } from "express";
import feedbackData from "../../data/feedback.js";
const router = Router();

router
  .get("/", async (req, res) => {
    try {
      let allFeedback = await feedbackData.getAll();
      res.render("./guest/guestFeedback/feedback", {
        title: "guest feedback page",
        feedback: allFeedback,
      });
    } catch (e) {}
  })
  .post("/", async (req, res) => {
    try {
      // Post one feedback
      const feedbackPostData = req.body;
      console.log(feedbackData);
      if (!feedbackPostData || Object.keys(feedbackPostData).length === 0) {
        return res
          .status(400)
          .json({ error: "There are no fields in the request body" });
      }

      const {
        guestId,
        roomType,
        guestName,
        bookingId,
        email,
        rating,
        comment,
      } = feedbackPostData;

      // Validate and trim data if necessary
      // ...

      let newFeedback = await feedbackData.create(
        guestId,
        roomType,
        guestName,
        bookingId,
        email,
        rating,
        comment
      );
      console.log("Successful insertion");
      res.json(newFeedback);
    } catch (e) {
      console.log(e);
      res;
      res.status(400).json({ error: e });
    }
  });

export default router;
