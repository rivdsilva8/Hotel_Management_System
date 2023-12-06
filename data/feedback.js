// CREATE, GET, DELETE, GET ALL
// CREATE: name, email (do not display), text box input, rating from 0 - 10
// GET: name, email
// GET ALL: show ratings for guests
// Delete: ID
import { feedbacks } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as help from "../helpers.js";

const exportedMethods = {
  async create(
    guestId,
    roomType,
    guestName,
    bookingId,
    email,
    rating,
    comment
  ) {
    //validation
    help.checkId(guestId);
    help.stringValidation(roomType);
    help.stringValidation(guestName);
    help.checkId(bookingId);
    help.ValidEmail(email);
    help.validRating(rating);
    help.stringValidation(comment);

    //trimming
    roomType = roomType.trim();
    guestName = guestName.trim();
    email = email.trim();
    comment = comment.trim();

    if (comment.length > 500)
      throw "ERROR : comment cannot be more than 500 characters ";

    //object creation
    const newFeedback = {
      guestId: guestId,
      roomType: roomType,
      guestName: guestName,
      bookingId: bookingId,
      email: email,
      rating: rating,
      comment: comment,
    };

    const feedbackCollection = await feedbacks();
    const newInsertInformation = await feedbackCollection.insertOne(
      newFeedback
    );
    const newId = newInsertInformation.insertedId;
    return await newId.toString();
  },

  async delete(feedbackId) {
    help.checkId(feedbackId);
    const feedbackCollection = await feedbacks();
    const deletionInfo = await feedbackCollection.findOneAndDelete({
      _id: new ObjectId(feedbackId),
    });
    if (deletionInfo === null) throw `feedback id not found`;

    let object = { ...deletionInfo };
    let feedbackName = object.guestName;
    let feedbackFinal = feedbackName + "'s Feedback";
    let result = { feedbackFinal, deleted: true };
    return result;
  },

  async getAll() {
    const feedbackCollection = await feedbacks();
    let allFeedback = await feedbackCollection
      .find(
        {},
        {
          projection: {
            _id: 0,
            guestName: 1,
            roomType: 1,
            rating: 1,
            comment: 1,
          },
        }
      )
      .toArray();

    console.log(allFeedback);
    return allFeedback;
  },
};

export default exportedMethods;
