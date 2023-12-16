// CREATE, GET, DELETE, GET ALL
// CREATE: name, email (do not display), text box input, rating from 0 - 10
// GET: name, email
// GET ALL: show ratings for guests
// Delete: ID
import { feedbacks } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as help from "../helpers.js";

const exportedMethods = {
  async create(guestId, roomType, guestName, rating, comment) {
    //validation

    if (roomType == undefined) {
      throw "Please select a Room Type";
    }

    if (comment.length == 0) {
      throw "Your comment cannot be empty";
    }

    help.checkId(guestId);
    help.stringValidation(roomType);
    help.stringValidation(guestName);
    help.validRating(rating);
    help.stringValidation(comment);

    //trimming
    roomType = roomType.trim();
    guestName = guestName.trim();
    comment = comment.trim();

    if (comment.length > 500)
      throw "ERROR : comment cannot be more than 500 characters ";

    //object creation
    const newFeedback = {
      guestId: guestId,
      roomType: roomType,
      guestName: guestName,
      rating: rating,
      comment: comment,
    };

    const feedbackCollection = await feedbacks();
    const newInsertInformation = await feedbackCollection.insertOne(
      newFeedback
    );
    const newId = newInsertInformation.insertedId;
    return "Thank you for your feedback!";
  },

  async delete(feedbackIds) {
    console.log("in delete df");
    console.log(feedbackIds);

    if (feedbackIds.length == 0)
      throw "Error: No feedbacks available, please add more";
    for (let id of feedbackIds) {
      help.checkId(id);
      const feedbackCollection = await feedbacks();
      const deletionInfo = await feedbackCollection.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (deletionInfo === null) throw `feedback id not found`;
    }
  },

  async getAll() {
    const feedbackCollection = await feedbacks();
    let allFeedback = await feedbackCollection
      .find(
        {},
        {
          projection: {
            _id: 1,
            guestName: 1,
            roomType: 1,
            rating: 1,
            comment: 1,
          },
        }
      )
      .toArray();

    return allFeedback;
  },

  async checkifExist(userId) {
    const feedbackCollection = await feedbacks();
    const existingId = await feedbackCollection.findOne({ guestId: userId });
    return existingId != null;
  },
};

export default exportedMethods;
