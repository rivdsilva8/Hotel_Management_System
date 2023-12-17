import { Router } from "express";
const router = Router();
import {averageRating} from "../../data/report.js";


router
    .route('/')
    .get(async (req, res) => {
        try {

            const avgRatingSingle = await averageRating('single');
            const avgRatingDouble = await averageRating('double');
            const avgRatingSuite = await averageRating('suite');


            return res.render('./Admin/adminReport/report', {
                
                avgRatingSingle,
                avgRatingDouble,
                avgRatingSuite,
                title:"Report"
            });
        } catch (e) {
            return res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    });


export default router