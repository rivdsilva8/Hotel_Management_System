// admin will see all the bookings in a list or he can add details for filtered bookings he need to click a button where the booking will change from pending to confirmed
// GET, POST
// GET all, GET, POST, EDIT
import { Router } from "express";
import xss from "xss";
import * as BookingFunctions from "../../data/booking.js";
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
    const XSSData = {
      FirstNameInput: xss(req.body.FirstNameInput),
      LastNameInput: xss(req.body.LastNameInput),
      EmailIdInput: xss(req.body.EmailIdInput),
      ContactNumberInput: xss(req.body.ContactNumberInput),
      CheckinDateInput: xss(req.body.CheckinDateInput),
      CheckoutDateInput: xss(req.body.CheckoutDateInput),
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
    const XSSData = {
      firstName: xss(req.body.firstName),
      email: xss(req.body.email),
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
    const booking = BookingFunctions.getBookingByIdAndTrue(bookingId);
    return res.json({ success: true });
  } catch (e) {
    console.error(e); // Log the error
    res.status(500).send("Error occurred: " + e.message); // Send detailed error message
  }
});

router.route("/deleteBooking/:id").delete(async (req, res) => {
  try {
    let deleteStatus = await BookingFunctions.DeleteBooking(
      req.params.id
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
    const booking = await BookingFunctions.getBookingById(req.params.id);
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
      const newBooking = await BookingFunctions.UpdateBooking(
        AddBookingData.bookingId,
        AddBookingData.FirstNameInput,
        AddBookingData.LastNameInput,
        AddBookingData.EmailIdInput,
        AddBookingData.ContactNumberInput,
        AddBookingData.CheckinDateInput,
        AddBookingData.CheckoutDateInput,
      );
      return res.redirect("/admin/booking/AdminShowAllBooking");
    } catch (e) {
      console.error(e); // Log the error
      res.status(500).send('Error occurred: ' + e.message); // Send detailed error message
    }
});

export default router;
