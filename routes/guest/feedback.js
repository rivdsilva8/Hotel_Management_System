import { Router } from "express";
import feedbackData from "../../data/feedback.js";
import { feedbacks } from "../../config/mongoCollections.js";
import { ObjectId } from "mongodb";
const router = Router();

router
  .get("/createFeedback", async (req, res) => {
    console.log("In createfeedback get");
    try {
      if (await feedbackData.checkifExist(req.session.user.id)) {
        return res.render("./guest/guestFeedback/createFeedback", {
          title: "Feedback Creation Page",
          alreadyReviewed: true,
        });
      }
      return res.render("./guest/guestFeedback/createFeedback", {
        title: "Feedback Creation Page",
      });
    } catch (e) {
      console.log(e);
      return res.render("./guest/guestFeedback/createFeedback", {
        title: "Feedback Creation Page",
        error: e,
      });
    }
  })
  .post("/createFeedback", async (req, res) => {
    console.log("In createfeedback Post");
    try {
      if (await feedbackData.checkifExist(req.session.user.id)) {
        throw "Sorry you have already left a review";
      }

      //Post one feedback
      const feedbackPostData = req.body;

      const { roomType, rating, comment } = feedbackPostData;

      let custName =
        req.session.user.firstName + " " + req.session.user.lastName;
      feedbackPostData.guestId = req.session.user.id;
      feedbackPostData.guestName = custName;

      let newFeedback = await feedbackData.create(
        feedbackPostData.guestId, // Use feedbackPostData.guestId here
        roomType,
        feedbackPostData.guestName,
        rating,
        comment
      );

      return res.render("./guest/guestFeedback/createFeedback", {
        title: "Feedback Create Page",
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.render("./guest/guestFeedback/createFeedback", {
        title: "Feedback Create Page",
        error: e,
      });
    }
  })
  .get("/updateFeedback", async (req, res) => {
    console.log("In updatefeedback get");
    try {
      if (!(await feedbackData.checkifExist(req.session.user.id))) {
        return res.render("./guest/guestFeedback/updateFeedback", {
          title: "Feedback Update Page",
          notReviewed: true,
        });
      }

      //get the users feedback and put it in the feilds
      const feedbackCollection = await feedbacks();
      const existingFeedback = await feedbackCollection.findOne({
        guestId: req.session.user.id,
      });

      res.render("./guest/guestFeedback/updateFeedback", {
        title: "Feedback Update Page",
        roomType: existingFeedback.roomType,
        rating: existingFeedback.rating,
        comment: existingFeedback.comment,
      });
    } catch (e) {
      console.log(e);
      res.render("./guest/guestFeedback/updateFeedback", {
        title: "Feedback Update Page",
        roomType: existingFeedback.roomType,
        rating: existingFeedback.rating,
        comment: existingFeedback.comment,
        error: e,
      });
    }
  })

  .post("/updateFeedback", async (req, res) => {
    try {
      //Patch one feedback
      console.log("In updateFeedback patch()");
      const feedbackPostData = req.body;
      console.log(feedbackData);
      if (!feedbackPostData || Object.keys(feedbackPostData).length === 0) {
        return res
          .status(400)
          .json({ error: "There are no fields in the request body" });
      }

      const { roomType, rating, comment } = feedbackPostData;
      //router validation
      if (roomType == undefined) {
        throw "Please select a Room Type";
      }

      if (comment.length == 0) {
        throw "Comment cannot be empty";
      }

      let custName =
        req.session.user.firstName + " " + req.session.user.lastName;
      feedbackPostData.guestId = req.session.user.id;
      feedbackPostData.guestName = custName;

      // Check if guestId already has feedback,if not then allow creation

      const feedbackCollection = await feedbacks();
      const existingFeedback = await feedbackCollection.findOne({
        guestId: req.session.user.id,
      });
      let delete_id = existingFeedback._id.toString();
      console.log("delete_id =" + delete_id);

      await feedbackData.delete([delete_id]);
      console.log("Deletion successful");

      let newFeedback = await feedbackData.create(
        feedbackPostData.guestId, // Use feedbackPostData.guestId here
        roomType,
        feedbackPostData.guestName,
        rating,
        comment
      );
      console.log("Successful update");
      res.render("./guest/guestFeedback/updateFeedback", {
        title: "Feedback Update Page",
        roomType: existingFeedback.roomType,
        rating: existingFeedback.rating,
        comment: existingFeedback.comment,
        success: true,
      });
    } catch (e) {
      const feedbackCollection = await feedbacks();
      const existingFeedback = await feedbackCollection.findOne({
        guestId: req.session.user.id,
      });

      console.log(e);
      res.render("./guest/guestFeedback/updateFeedback", {
        title: "Feedback Update Page",
        roomType: existingFeedback.roomType,
        rating: existingFeedback.rating,
        comment: existingFeedback.comment,
        error: e,
      });
    }
  })

  .get("/deleteFeedback", async (req, res) => {
    console.log("In deletefeedback get");
    try {
      console.log(
        "checkifExist = " +
          (await feedbackData.checkifExist(req.session.user.id))
      );
      if (!(await feedbackData.checkifExist(req.session.user.id))) {
        return res.render("./guest/guestFeedback/deleteFeedback", {
          title: "Feedback Deletion Page",
          notReviewed: true,
          roomType: "",
          rating: "",
          guestName: "",
          comment: "",
        });
      }

      //get the users feedback and put it in the feilds
      const feedbackCollection = await feedbacks();
      const existingFeedback = await feedbackCollection.findOne({
        guestId: req.session.user.id,
      });
      let roomType = existingFeedback.roomType;
      let rating = existingFeedback.rating;
      let guestName = existingFeedback.guestName;
      let comment = existingFeedback.comment;

      return res.render("./guest/guestFeedback/deleteFeedback", {
        title: "Feedback Deletion Page",
        roomType: roomType,
        rating: rating,
        guestName: guestName,
        comment: comment,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send("An error occurred");
    }
  })
  .delete("/deleteFeedback", async (req, res) => {
    try {
      if (!(await feedbackData.checkifExist(req.session.user.id))) {
        return res.render("./guest/guestFeedback/deleteFeedback", {
          title: "Feedback Deletion Page",
          notReviewed: true,
        });
      }
      console.log("in deletefeedback delete()");
      const feedbackCollection = await feedbacks();
      const existingFeedback = await feedbackCollection.findOne({
        guestId: req.session.user.id,
      });
      let delete_id = existingFeedback._id.toString();
      console.log("delete_id =" + delete_id);

      await feedbackData.delete([delete_id]);
      console.log("Deletion successful");
      return res.redirect("/guest/feedback");
    } catch (e) {
      console.log(e);
      return res.status(500).send("An error occurred");
    }
  })
  .get("/", async (req, res) => {
    try {
      let allFeedback = await feedbackData.getAll();
      res.render("./guest/guestFeedback/feedback", {
        title: "guest feedback page",
        feedback: allFeedback,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  });

export default router;
