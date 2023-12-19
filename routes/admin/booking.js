// admin will see all the bookings in a list or he can add details for filtered bookings he need to click a button where the booking will change from pending to confirmed
// GET, POST
// GET all, GET, POST, EDIT
import { Router } from "express";
import xss from "xss";
import * as BookingFunctions from "../../data/booking.js";
import * as helpers from "../../helpers.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./Admin/adminBooking/BookingOptions", {
      title: "admin booking manipulation",
    });
  } catch (e) {
    return res.status(500).render('error',{title: "Error Page",error:e});
  }
});

router.route("/adminBooking").get(async (req, res) => {
  try {
    return res.render("./Admin/adminBooking/adminBooking", {
      title: "Admin Booking",
    });
  } catch (e) {
    return res.status(404).render("error", { title: "Error", error: e });
  }
});

router.route("/adminBooking").post(async (req, res) => {
  try {
    const AddBookingData = req.body;
    const firstNameErr = {empty:'First Name cannot be Empty', invalid:'First Name is invalid and cannot be less than 2 letters'};
    const lastNameErr = {empty:'Last Name cannot be Empty', invalid:'Last Name is invalid and cannot be less than 2 letters'};
    const firstAcctName = await helpers.validateString(req.body.FirstNameInput,2,25,firstNameErr);
    const lastAcctName = await helpers.validateString(req.body.LastNameInput,2,25,lastNameErr);
    const emailInputValidate = await helpers.validateEmail(req.body.EmailIdInput);
    console.log(req.body.phone);
    console.log(typeof(req.body.phone));
    const validatePhoneNumber = await helpers.validatePhoneNumber(req.body.phone);
    const validateCheckInDate = await helpers.validateDates(req.body.CheckinDateInput);
    const validateCheckOutDate = await helpers.validateDates(req.body.CheckoutDateInput);

    const XSSData = {
      FirstNameInput: xss(firstAcctName),
      LastNameInput: xss(lastAcctName),
      EmailIdInput: xss(emailInputValidate),
      ContactNumberInput: xss(validatePhoneNumber),
      CheckinDateInput: xss(validateCheckInDate),
      CheckoutDateInput: xss(validateCheckOutDate),
    };
    const newBooking = await BookingFunctions.CreateBooking(
      XSSData.FirstNameInput,
      XSSData.LastNameInput,
      XSSData.EmailIdInput,
      XSSData.ContactNumberInput,
      XSSData.CheckinDateInput,
      XSSData.CheckoutDateInput
    );
    res.render("./success", {
      title: "Task Success",
      content: "Guest booking was successful",
    });
  } catch (e) {
    console.error(e); // Log the error
    res.status(500).send("Error occurred: " + e.message); // Send detailed error message
  }
});

router.route("/AdminBookingGetAll").get(async (req, res) => {
  try {
    return res.render("./Admin/adminBooking/AdminBookingGetAll", {
      title: "Admin Booking",
    });
  } catch (e) {
    return res.status(404).render("error", { title: "Error", error: e });
  }
});

router.route("/search.html").post(async (req, res) => {
  try {
    const AddBookingData = req.body;
    let newBooking = [];
    const firstNameErr = {empty:'First Name cannot be Empty', invalid:'First Name is invalid and cannot be less than 2 letters'};
    const firstAcctName = await helpers.validateString(req.body.firstName,2,25,firstNameErr);
    const emailInputValidate = await helpers.validateEmail(req.body.email);
    const XSSData = {
      firstName: xss(firstAcctName),
      email: xss(emailInputValidate),
    };
    newBooking = await BookingFunctions.GetAllBooking(
      XSSData.firstName,
      XSSData.email
    );
    if (newBooking.length === 0) {
      res.render("./partials/searched-bookings", {
        layout: null,
        sampleResult: false,
      });
      return;
    }
    console.log(newBooking);
    res.render("./partials/searched-bookings", {
      layout: null,
      sampleResult: newBooking,
    });
  } catch (e) {
    console.error(e); // Log the error
    res.status(500).send("Error occurred: " + e.message); // Send detailed error message
  }
});

router.route("/AdminShowAllBooking").get(async (req, res) => {
  try {
    const AllData = await BookingFunctions.ShowAllBooking();
    return res.render("./Admin/adminBooking/AdminShowAllBooking", {
      sampleResult: AllData,
      title: "Admin Show All Booking",
    });
  } catch (e) {
    return res.status(404).render("error", { title: "Error", error: e });
  }
});

router.route("/book/:id").put(async (req, res) => {
  try {
    const bookingId = req.params.id;
    const validatedBookingID = await helpers.checkId(bookingId, "booking id");
    const booking = BookingFunctions.getBookingByIdAndTrue(validatedBookingID);
    return res.json({ success: true });
  } catch (e) {
    console.error(e); // Log the error
    res.status(500).send("Error occurred: " + e.message); // Send detailed error message
  }
});

router.route("/deleteBooking/:id").delete(async (req, res) => {
  const bookingId = req.params.id;
  const validatedBookingID = await helpers.checkId(bookingId, "booking id");
  try {
    let deleteStatus = await BookingFunctions.DeleteBooking(
      validatedBookingID
    );
    if (deleteStatus.deleted === true) {
      res.status(200).json({ success: true, message: "Booking deleted" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting booking" });
  }
});

router
.route("/update-booking/:id")
.get(async(req,res) => {
  console.log("in routs???")
  try{
    const validatedBookingID = await helpers.checkId(req.params.id, "booking id");
    const booking = await BookingFunctions.getBookingById(validatedBookingID);
    return res.render('./Admin/adminBooking/updateBooking', {booking: booking});
  }catch(e){
    return res.status(404).render('error',{title:'Error',error: e});
  }
});

router
  .route("/update")
  .post(async (req, res) => {
    try {
      const AddBookingData = req.body;
      //
      const bookingId = AddBookingData.bookingId;
      const validatedBookingID = await helpers.checkId(bookingId, "booking id");
      const firstNameErr = {empty:'First Name cannot be Empty', invalid:'First Name is invalid and cannot be less than 2 letters'};
      const lastNameErr = {empty:'Last Name cannot be Empty', invalid:'Last Name is invalid and cannot be less than 2 letters'};
      const firstAcctName = await helpers.validateString(AddBookingData.FirstNameInput,2,25,firstNameErr);
      const lastAcctName = await helpers.validateString(AddBookingData.LastNameInput,2,25,lastNameErr);
      const emailInputValidate = await helpers.validateEmail(AddBookingData.EmailIdInput);
      const validatePhoneNumber = await helpers.validatePhoneNumber(AddBookingData.ContactNumberInput);
      const validateCheckInDate = await helpers.validateDates(AddBookingData.CheckinDateInput);
      const validateCheckOutDate = await helpers.validateDates(AddBookingData.CheckoutDateInput);

      //
      const XSSData = {
        FirstNameInput: xss(firstAcctName),
        LastNameInput: xss(lastAcctName),
        EmailIdInput: xss(emailInputValidate),
        ContactNumberInput: xss(validatePhoneNumber),
        CheckinDateInput: xss(validateCheckInDate),
        CheckoutDateInput: xss(validateCheckOutDate),
      };

      const newBooking = await BookingFunctions.UpdateBooking(
        validatedBookingID,
        XSSData.FirstNameInput,
        XSSData.LastNameInput,
        XSSData.EmailIdInput,
        XSSData.ContactNumberInput,
        XSSData.CheckinDateInput,
        XSSData.CheckoutDateInput,
      );
      return res.redirect("/admin/booking/AdminShowAllBooking");
    } catch (e) {
      console.error(e); // Log the error
      res.status(500).send('Error occurred: ' + e.message); // Send detailed error message
    }
});

export default router;
