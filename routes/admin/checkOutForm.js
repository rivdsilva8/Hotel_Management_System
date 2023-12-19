import { Router } from "express";
import * as h from '../../data/checkedinandout.js';

const router = Router();

router.route('/').get((req, res) => {
    try {
        return res.render('./Admin/adminCheckinandOut/adminCheckout', { title: "Check out Page" });
    } catch (e) {
        return res.status(404).render('error', { title: 'Error', error: e });
    }
});

router.route('/getbookingbyemail/:email').get(async (req, res) => {
    try {
        let b = await h.getBookingbyEmail(req.params.email);
        if (b === "-1") return res.json({});
        return res.json(b);
    } catch (e) {
        return res.status(404).render('error', { title: 'Error', error: e });
    }
});

router.route('/checkout/:emailId').post(async (req, res) => {
    try {
        let b = await h.checkout(req.params.emailId);
        if (b === "-1") return res.json({});
        return res.json(b);
    } catch (e) {
        return res.status(404).render('error', { title: 'Error', error: e });
    }
});

export default router;