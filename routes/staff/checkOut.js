import { Router } from "express";
const router = Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            res.render("./staff/checkOut", {
              title: "staff checkOut page",
              userId:req.session.user.id
            });
          } catch (e) {
            return res.status(500).render('guest/errorPage',{error:e.message});
          }

    })

export default router