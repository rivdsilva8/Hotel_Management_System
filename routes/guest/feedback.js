import { Router } from "express";
import feedbackData from "../../data/feedback.js";
const router = Router();

router
  .get("/createFeedback", async (req, res) => {
    console.log("In createfeedback get");
    try {
      res.render("./guest/guestFeedback/createFeedback", {
        title: "Feedback creation page",
      });
    } catch (e) {}
  })
  .post("/createFeedback", async (req, res) => {
    try {
      console.log("In post feedback");

      //Post one feedback
      const feedbackPostData = req.body;
      console.log(feedbackData);
      if (!feedbackPostData || Object.keys(feedbackPostData).length === 0) {
        return res
          .status(400)
          .json({ error: "There are no fields in the request body" });
      }

      const { roomType, guestName, rating, comment } = feedbackPostData;
      feedbackPostData.guestId = "65768b26036df2cbfd2d2e93";
      feedbackPostData.guestName = "Aldrich";

      // Check if guestId already has feedback,if not then allow creation

      let newFeedback = await feedbackData.create(
        feedbackPostData.guestId, // Use feedbackPostData.guestId here
        roomType,
        feedbackPostData.guestName,
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
  })
  .get("/", async (req, res) => {
    try {
      let allFeedback = await feedbackData.getAll();
      res.render("./guest/guestFeedback/feedback", {
        title: "guest feedback page",
        feedback: allFeedback,
      });
    } catch (e) {}
  });

export default router;
