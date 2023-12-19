// import { ObjectId } from "mongodb";
import { bookings } from "../config/mongoCollections.js";
import * as helpers from '../helpers.js'


export const getBookingbyEmail = async (emailId) => {
    try{
        emailId = await helpers.validateEmail(emailId)
        let CheckBooking = await bookings();
        let GetAllCheckin = await CheckBooking.find({ emailId:emailId }).toArray();
        if (GetAllCheckin === null){
            throw `No Data Found For Checkin Please Try Again`;
        }
        return GetAllCheckin;
    }catch(e){
        throw `Error: ${e}`;
    }
};

export const putCheckIne = async (emailId) => {
    try{
        let AddCheckin = await bookings();
        let GetCheckinData = await AddCheckin.findOne({ emailId: emailId });
        if (GetCheckinData === null){
            throw `No Data Found For Checkin Please Try Again`;
        }
        await AddCheckin.updateOne({ emailId: emailId }, { $set: { CheckedIn: true } });
        return "Updated successfully";
    }catch(e){
        throw `Error: ${e}`;
    }
}

export const clean = async (emailId) => {
    try{
        let GetCleanStatusData = await bookings();
        let CleanedRoomData = await GetCleanStatusData.findOne({ emailId: emailId });
        if (CleanedRoomData === null){
            throw `No Data Found For Checkin Please Try Again`;
        }
        await GetCleanStatusData.updateOne({ emailId: emailId }, { $set: { cleanStatus: true } });
    }catch(e){
        throw `Error: ${e}`;
    }
}

export const checkout = async (emailId) => {
    try{
        let GetCheckoutData = await bookings();
        let UpdateCheckOut = await GetCheckoutData.findOne({ emailId: emailId });
        if (UpdateCheckOut === null){
            throw `No Data Found For Checkin Please Try Again`;
        }
        if(c.CheckedIn == true){
            await GetCheckoutData.updateOne({ emailId: emailId }, { $set: { CheckedOut: true, cleanStatus: false, CheckedIn: false } });
        }
        return "Updated successfully";
    }catch(e){
        throw `Error: ${e}`;
    }
}

export const makeBooking = async (emailId) => {
    try{
        emailId = await helpers.validateEmail(emailId)
        let ChangeBookingStatus = await bookings();
        let UpdateBookingStatus = await ChangeBookingStatus.findOne({emailId:emailId});
        if (UpdateBookingStatus === null) {
            throw `No Data Found For Checkin Please Try Again`;
        }
        let UpdateBooking = await ChangeBookingStatus.updateOne({ emailId: emailId }, { $set: { BookingStatus: true } });
        return UpdateBooking
    }catch(e){
        throw `Error: ${e}`;
    }
}