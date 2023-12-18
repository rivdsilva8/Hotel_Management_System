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
    try {
      let allFeedback = await feedbackData.getAll();
      res.render("./Admin/adminFeedback/feedback", {
        title: "Admin feedback mainpulation",
        feedback: allFeedback,
      });
    } catch (e) {
      console.log(e);
      return res.render("./Admin/adminFeedback/feedback", {
        title: "Admin feedback mainpulation",
        error: e,
      });
    }
  })

  .delete(async (req, res) => {
    //code here for DELETE
    try {
      console.log("In delete route");
      let delete_ids = req.body.deleteFeedbackIds;
      console.log("delete_ids =" + delete_ids);
      if (delete_ids.length == 0) {
        throw "Error : No feedbacks selected";
      }

      let result = await feedbackData.delete(delete_ids);
      
      
      // return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.render("./Admin/adminFeedback/feedback", {
        title: "Admin feedback mainpulation",
        error: e,
      });
    }
  });

export default router;
