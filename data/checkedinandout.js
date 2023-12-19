// import { ObjectId } from "mongodb";
import { bookings } from "../config/mongoCollections.js";
import * as helpers from '../helpers.js'


export const getBookingbyEmail = async (emailId) => {
    emailId = await helpers.validateEmail(emailId)
    let CheckBooking = await bookings();
    let GetAllCheckin = await CheckBooking.find({ emailId:emailId }).toArray();
    return GetAllCheckin;
};

export const putCheckIne = async (emailId) => {
    let b = await bookings();
    let c = await b.findOne({ emailId: emailId });
    if (c === null) return "-1";
    await b.updateOne({ emailId: emailId }, { $set: { CheckedIn: true } });
    return "Updated successfully";
}

export const putCheckOute = async (emailId) => {
    let b = await bookings();
    let c = await b.findOne({ emailId: emailId });
    if (c === null) return "-1";
    if(c.CheckedIn == true){
        await b.updateOne({ emailId: emailId }, { $set: { CheckedOut: true } });
    }
    return "Updated successfully";
}

export const makeBooking = async (emailId) => {
    emailId = await helpers.validateEmail(emailId)
    let b = await bookings();
    let res = await b.findOne({emailId:emailId});
    if (res === null) {
        return "-1";
    }
    let makebooking = await b.updateOne({ emailId: emailId }, { $set: { BookingStatus: true } });
    return makebooking
}