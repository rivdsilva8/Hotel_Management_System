// create a account creation file where we will get input form admin like name, email, contact number, create youe own id, password,confirm password
// POST function
// here admin can add and edit details

import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("./Admin/adminAccount/adminCreateAccount", {
      title: "admin account manipulation",
    });
  } catch (e) {}
});

export default router;
