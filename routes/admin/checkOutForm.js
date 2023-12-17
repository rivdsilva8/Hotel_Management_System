import { Router } from "express";
import * as h from '../../data/checkedinandout.js'
const router = Router();

router.route('/').get((req,res)=>{
    return res.render('./Admin/adminCheckinandOut/adminCheckout',{title:"Check out Page"});
})

router.route('/getbookingbyemail/:email').get(async (req,res)=>{
    let b = await h.getBookingbyEmail(req.params.email)
    if (b === "-1") return res.json({})
    return res.json(b)
})

router.route('/putCheckOute/:emailId').post(async (req,res) =>{
    let b = await h.putCheckOute(req.params.emailId)
    if (b === "-1") return res.json({})
    return res.json(b)
})

export default router