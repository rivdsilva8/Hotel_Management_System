// CREATE, GET, DELETE, GET ALL
// CREATE: name, email (do not display), text box input, rating from 0 - 10
// GET: name, email
// GET ALL: show ratings for guests
// Delete: ID
import { feedbacks } from "../config/mongoCollections.js";
import * as help from "../helpers.js";

const exportedMethods = {
  async create(guestName, bookingId, email, rating, comment) {
    //validation
    help.stringValidation(guestName);
    help.checkId(bookingId);
    help.ValidEmail(email);
    help.validRating(rating);
    help.stringValidation(comment);

    //trimming
    guestName = guestName.trim();
    email = email.trim();
    comment = comment.trim();
    if (comment.length > 500)
      throw "ERROR : comment cannot be more than 500 characters ";

    //object creation
    const newFeedback = {
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
    // return await this.get(newId.toString());
  },
};
export default exportedMethods;
