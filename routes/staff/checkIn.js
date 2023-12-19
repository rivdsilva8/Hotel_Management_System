import { Router } from "express";
import * as h from '../../data/checkedinandout.js'
const router = Router();

router.route('/').get((req,res)=>{
    return res.render('./staff/checkIn',{title:"Check In Page"});
})

router.route('/getbookingbyemail/:email').get(async (req, res) => {
    try {
        let GetBookingEmail = await checkInDetail.getBookingbyEmail(req.params.email);
        if (GetBookingEmail === "-1") return res.json({});
        return res.json(GetBookingEmail);
    } catch (e) {
        return res.status(404).render('error', { title: 'Error', error: e });
    }
});

router.route('/putCheckIne/:emailId').post(async (req, res) => {
    try {
        let AddCheckInEmail = await checkInDetail.putCheckIne(req.params.emailId);
        if (AddCheckInEmail === "-1") return res.json({});
        return res.json(AddCheckInEmail);
    } catch (e) {
        return res.status(404).render('error', { title: 'Error', error: e });
    }
});

router.route("/makeBooking/:emailId").post(async (req, res) => {
    try {
        let MakeBookingEmail = await checkInDetail.makeBooking(req.params.emailId);
        if (MakeBookingEmail == "-1") return res.json({});
        return res.json(MakeBookingEmail);
    } catch (e) {
        return res.status(404).render('error', { title: 'Error', error: e });
    }
});

router.route('/clean/:emailId').post(async (req, res) => {
    try {
        let AddCheckInEmail = await checkInDetail.clean(req.params.emailId);
        if (AddCheckInEmail === "-1") return res.json({});
        return res.json(AddCheckInEmail);
    } catch (e) {
        return res.status(404).render('error', { title: 'Error', error: e });
    }
});

export default router;