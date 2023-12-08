// admin will see all the bookings in a list or he can add details for filtered bookings he need to click a button where the booking will change from pending to confirmed
// GET, POST
// GET all, GET, POST, EDIT
import { Router } from "express";
import * as BookingFunctions from '../../data/booking.js';
const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     res.render("./Admin/adminBooking/adminBooking", {
//       title: "admin booking manipulation",
//     });
//   } catch (e) {}
// });

router.route('/').get(async (req,res) => {
  return res.json({error: 'Your should not be here.'});
});

router
  .route('/book')
  .get(async(req,res) => {
    return res.render("./Admin/adminBooking/adminBooking",{title:'Room Booking',error:''});
  })
  .post(async(req,res) => {
    try{
      let BookingForm = req.body;
      const AddBookingData = await BookingFunctions.CreateBooking(BookingId,lastName,emailId,contactNumber,BookingDate,CheckinDate,CheckOutDate,BookingStatus);
      if(AddBookingData.insertedUser == true){
        return res.redirect('/');
      }else{
        throw `something went wrong`;
      }
    }catch(e){
      return res.status(404).render('error',{title:'Error',error: e});
    }
  });

export default router;
