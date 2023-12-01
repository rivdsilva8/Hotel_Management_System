import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./guest/guestBooking/booking", {
      title: "guest booking page",
    });
  } catch (e) {}
});

export default router;
