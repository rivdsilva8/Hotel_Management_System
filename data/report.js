import {feedbacks} from "../config/mongoCollections.js";


export const averageRating = async (roomType) => {
    const feedbackCollection = await feedbacks();
    const feedback = await feedbackCollection.find({ roomType: roomType }).toArray();

    if (feedback.length === 0) {
        throw new Error("No feedback found for the specified room type.");
    }

    const totalRating = feedback.reduce((acc, feedback) => acc + feedback.rating, 0);
    const averageRating = totalRating / feedback.length;

    return averageRating;

}