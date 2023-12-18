// CREATE, DELETE, EDIT, READ
// CREATE: Room Number, booking date, checkin date, checkout date, guest name, guest email, booking status
// Delete: guest name, guest email, room number, checkin date
// READ: name, email, room number
import { ObjectId } from "mongodb";
import { bookings } from "../config/mongoCollections.js";
import * as helpers from '../helpers.js'
//import * as helpers from '../helpers.js'
import { BookFirstName, BookLastName, BookEmailId, BookContactNumber } from "../helpers.js";

export const CreateBooking = async (
    firstName,
    lastName,
    emailId,
    contactNumber,
    CheckinDate,
    CheckOutDate,
    roomNumber,
    roomType,
    roomPrice
) => {
    try {
        const AddBookingsDetails = await bookings();
        if (!firstName || !lastName || !emailId || !contactNumber || !CheckinDate || !CheckOutDate) throw `Error: Please fill all the sections`;

        const checkInDate = new Date(CheckinDate);
        const checkOutDate = new Date(CheckOutDate);

        const differenceInMs = checkOutDate - checkInDate;

        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const numberOfDays = Math.floor(differenceInMs / millisecondsInDay);

        roomPrice = Number(roomPrice) * numberOfDays;

        firstName = await BookFirstName(firstName);
        lastName = await BookLastName(lastName);
        emailId = await BookEmailId(emailId);
        //contactNumber = await BookContactNumber(contactNumber);

        firstName = firstName.trim();
        lastName = lastName.trim();
        emailId = emailId.trim();
        contactNumber = contactNumber.trim();
        CheckinDate = CheckinDate.trim();
        CheckOutDate = CheckOutDate.trim();

        firstName = firstName.toLowerCase();
        lastName = lastName.toLowerCase();
        emailId = emailId.toLowerCase();

        const Booking_Current_Date = new Date();
        const BookYear = Booking_Current_Date.getFullYear();
        const BookMonth = Booking_Current_Date.getMonth();
        const BookDay = Booking_Current_Date.getDay();
        const Final_BookDate = `${BookYear}/${BookMonth}/${BookDay}`

        const GuestBookingDetails = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            contactNumber: contactNumber,
            BookingDate: Final_BookDate,
            CheckinDate: CheckinDate,
            CheckOutDate: CheckOutDate,
            BookingStatus: false,
            roomNumber: roomNumber,
            roomType: roomType,
            roomPrice: roomPrice
        };
        const AddBooking = await AddBookingsDetails.insertOne(GuestBookingDetails);
        if (!AddBooking.acknowledged || !AddBooking.insertedId) {
            throw `Could not add data`;
        };
        // const GetDataById = AddBooking.insertedId.toString();
        // const CheckBookingById = await GetBooking(GetDataById);
        // return CheckBookingById; 
        return AddBooking;
    } catch (e) {
        throw `Error: ${e}`;
    }
};

export const GetBooking = async (firstName, emailId) => {
    try {
        firstName = helper.stringValidation(firstName);
        emailId = helper.stringValidation(emailId);
        let GetBookingId = await bookings();
        let GetBookingDetails = await GetBookingId.findOne({ firstName: firstName, emailId: emailId });
        if (GetBookingDetails !== true) {
            throw `The particular ID Does not exists`;
        }
    } catch (e) {
        throw `Error: ${e}`;
    }
};

export const getBookingByIdAndTrue = async (bookingId) => {
    try {
        bookingId = helpers.checkId(bookingId);
        let bookingCollection = await bookings();
        let UpdateEventData = {
            $set: { BookingStatus: true }
        };
        const updatedBooking = await bookingCollection.findOneAndUpdate(
            { _id: new ObjectId(bookingId) },
            UpdateEventData,
            { returnDocument: 'after' }
        );
        if (!updatedBooking) {
            throw `update failed could not update data`;
        }
        return updatedBooking;
    } catch (e) {
        throw `Error: ${e}`;
    }
}
export const GetAllBooking = async (firstName, emailId) => {
    try {
        firstName = helper.stringValidation(firstName);
        emailId = helper.stringValidation(emailId);
        let GetAllBookingId = await bookings();
        let GetAllBookingDetails = await GetAllBookingId.find({ firstName: firstName, emailId: emailId }).toArray();
        return GetAllBookingDetails;
    } catch (e) {
        throw `Error: ${e}`;
    }
};

export const ShowAllBooking = async () => {
    try {
        let GetAllBookingId = await bookings();
        let GetAllBookingDetails = await GetAllBookingId.find({}).toArray();
        return GetAllBookingDetails;
    } catch (e) {
        throw `Error: ${e}`;
    }
};


export const DeleteBooking = async (BookId) => {
    try {
        BookId = helpers.checkId(BookId);
        let DeleteBooking = await bookings();
        let DeleteBookingData = await DeleteBooking.findOneAndDelete({ _id: new ObjectId(BookId) });
        return { ...DeleteBookingData, deleted: true };
    } catch (e) {
        throw `Error: ${e}`;
    }
};

export const UpdateBooking = async (
    id,
    firstName,
    lastName,
    emailId,
    contactNumber,
    CheckinDate,
    CheckOutDate,
) => {
    try {

        if (!firstName || !lastName || !emailId || !contactNumber || !CheckinDate || !CheckOutDate) throw `Error: Please fill all the sections`;

        const checkInDate = new Date(CheckinDate);
        const checkOutDate = new Date(CheckOutDate);

        const differenceInMs = checkOutDate - checkInDate;

        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const numberOfDays = Math.floor(differenceInMs / millisecondsInDay);

        const roomPrice = Number(roomPrice) * numberOfDays;

        firstName = await BookFirstName(firstName);
        lastName = await BookLastName(lastName);
        emailId = await BookEmailId(emailId);
        //contactNumber = await BookContactNumber(contactNumber);

        firstName = firstName.trim();
        lastName = lastName.trim();
        emailId = emailId.trim();
        contactNumber = contactNumber.trim();
        CheckinDate = CheckinDate.trim();
        CheckOutDate = CheckOutDate.trim();

        firstName = firstName.toLowerCase();
        lastName = lastName.toLowerCase();
        emailId = emailId.toLowerCase();

        const UpdateBooking = await bookings();

        let BookingData = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            contactNumber: contactNumber,
            CheckinDate: CheckinDate,
            CheckOutDate: CheckOutDate,
            roomPrice: roomPrice
        };
        const UpdateBookingData = await UpdateBooking.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: BookingData },
            { returnOriginal: false }
        );
        if (!UpdateBookingData) {
            throw `Update failed could not update data`;
        }
        return UpdateBookingData;
    } catch (e) {
        throw `Error: ${e}`;
    }
}


export const cardPaymnetOnSuccess = async (bookingID, personName) => {
    try {
        let getBookindDatas = await bookings();
        const [firstName, lastName] = personName.split(' ');
        const bookingIDDetails = await helpers.checkId(bookingID, "Booking Id");
        const updateResult = await getBookindDatas.updateOne({
            _id: new ObjectId(bookingIDDetails)
        }, {
            $set: { paymentSuccess: true }
        }
        );
        if (updateResult.matchedCount === 0) {
            throw `No Matcing booking found or updateFailed`;
        }
        return updateResult;
    } catch (e) {
        throw `Error: ${e}`
    }
}

export const fetchBookindData = async (bookingID) => {
    try {
        let getBookindDatas = await bookings();
        const objectBookingID = await helpers.checkId(bookingID, "Booking Id");
        const fetchBookingRecords = await getBookindDatas.findOne({ _id: new ObjectId(objectBookingID) });
        if (!fetchBookingRecords) {
            throw `No booking found for the given Id: ${objectBookingID}`;
        }
        return fetchBookingRecords;
    } catch (e) {
        throw e;
    }

}