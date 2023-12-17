import { Router } from "express";
import * as h from '../../data/checkedinandout.js'
const router = Router();

router.route('/').get((req,res)=>{
    return res.render('./Admin/adminCheckinandout/adminCheckin');
})

router.route('/getbookingbyemail/:email').get(async (req,res)=>{
    let b = await h.getBookingbyEmail(req.params.email)
    if (b === "-1") return res.json({})
    return res.json(b)
})

router.route('/putCheckIne/:emailId').post(async (req,res) =>{
    let b = await h.putCheckIne(req.params.emailId)
    if (b === "-1") return res.json({})
    return res.json(b)
})

router.route("/makeBooking/:emailId").post(async (req,res) => {
    let b = await h.makeBooking(req.params.emailId)
    if (b == "-1") return res.json({})
    return res.json(b)
})

export default router