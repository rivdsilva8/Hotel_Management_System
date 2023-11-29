// admin will see all the bookings in a list or he can add details for filtered bookings he need to click a button where the booking will change from pending to confirmed
// GET, POST
// GET all, GET, POST, EDIT
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./Admin/adminBooking/adminBooking", {
      title: "admin booking manipulation",
    });
  } catch (e) {}
});

export default router;
