import { Router } from "express";
const router = Router();
import { fetchBookindData,cardPaymnetOnSuccess,CreateBooking,GetBooking,DeleteBooking,UpdateBooking } from "../../data/booking.js";
import xss from 'xss';
import * as helpers from '../../helpers.js';
import fs from 'fs';
import {createReceiptPDF} from "../../utils/createPdf.js";

router.route("/").get(async (req, res) => {
  try {
    res.render("./guest/guestBooking/booking", {
      title: "guest booking page",
    });
  } catch (e) {}
});


router
  .route("/book")
  .post(async (req, res) => {
    try {
      const AddBookingData = req.body;
      const newBooking = await CreateBooking(
        AddBookingData.FirstNameInput,
        AddBookingData.LastNameInput,
        AddBookingData.EmailIdInput,
        AddBookingData.ContactNumberInput,
        AddBookingData.CheckinDateInput,
        AddBookingData.CheckoutDateInput
      );
      req.session.insertBookingId = newBooking.insertedId;
      res.render("./guest/guestPayment/payment", {title: "Payment Page"});
    } catch (e) {
      console.error(e); // Log the error
      res.status(500).send('Error occurred: ' + e.message); // Send detailed error message
    }
});


router.route("/payment")
.post(async(req,res) =>{
  try{
    
    const bookingId = req.session.insertBookingId;
    const validateBookingId = await helpers.checkId(bookingId,"booking id");
    const {cardNumber,cardName, expiryMonth, expiryYear,cvv } = req.body;
    const validatedCardNumber = await helpers.validateCardNumber(cardNumber);
    const sanitizeCard = xss(validatedCardNumber);
    const validteExpiryMonth = await helpers.validateExpiryMonth(expiryMonth);
    const sanitizeExpiryMonth= xss(validteExpiryMonth);
    const name = await helpers.validateCardName(cardName);
    const sanitizeName = xss(name);
    const validteCardName = await helpers.validateExpiryYear(expiryYear);
    const sanitizeCardName = xss(validteCardName);
    const validateCVV = await helpers.validateCVV(cvv);
    const sanitizevalidateCVV= xss(validateCVV);
    const payment = await cardPaymnetOnSuccess(validateBookingId, sanitizeName);
    if(payment.acknowledged === true){
      res.render("./guest/guestPayment/payment", {title: "Payment Page", paymentSuccess: true});
    }

  }catch(e){
    console.log(e);
    res.status(500).send('Error occurred: ' + e.message); 
  }
});

router
  .route("/report")
  .get(async(req,res)=>{
    try{
      const bookingId = req.session.insertBookingId;
    const validatedBookingID=await helpers.checkId(bookingId,"booking id");
    const firstNameInput = req.session.user.firstName;
    const lastNameInput = req.session.user.lastName;
    const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
      const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
      const firstName = await helpers.validateString(firstNameInput,2,25,firstNameErr);
      const lastName = await helpers.validateString(lastNameInput,2,25,lastNameErr);
      const fetchBookingDataDetails = await fetchBookindData(validatedBookingID);
    //code for pdf generation
    const pdfPath = `./pdfs/account-details-${validatedBookingID}.pdf`;
    if(!fs.existsSync('./pdfs')){
      fs.mkdirSync('./pdfs');
    }
    
      await createReceiptPDF ({
        'First Name':firstName,
        'Last Name':lastName,
        'Email':fetchBookingDataDetails.emailId,
        'Phone Number':fetchBookingDataDetails.contactNumber,
        'Booking Id':validatedBookingID,
        'Booking Fees': "$300",
        'Booking Date':fetchBookingDataDetails.BookingDate,
        'Check In-Date':fetchBookingDataDetails.CheckinDate,
        'Check Out-Date':fetchBookingDataDetails.CheckOutDate
        //'Phone':`${phonePrefixVal} ${phoneNumber}`
      },pdfPath);
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition',`attachment; filename=account-details-${validatedBookingID}.pdf`);
      const readStream = fs.createReadStream(pdfPath);
      readStream.pipe(res);
      readStream.on('end',()=>{
        fs.unlinkSync(pdfPath);
      });
    }catch(e){
      console.log(e);
    }
    //
  });

export default router;
