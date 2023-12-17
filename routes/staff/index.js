import { Router } from "express";
import checkInRoutes from './checkIn.js';
import checkOutRoutes from "./checkOut.js";
import markRoutes from './markDirtyRoom.js'


const router = Router();

router.get("/", async (req, res) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
  try {
    res.render("../views/staff/staffDashboard", {
      title: "Welcome to Staff Page",
      userId:req.session.user.id
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

router.use('/checkIn', checkInRoutes);
router.use('/checkOut', checkOutRoutes);
router.use('/markDirtyRoom', markRoutes)

export default router