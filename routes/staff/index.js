import { Router } from "express";
import checkInRoutes from './checkIn.js';
import checkOutRoutes from "./checkOut.js";
import markRoutes from './markDirtyRoom.js'


const router = Router();

router.use('/checkIn', checkInRoutes);
router.use('/checkOut', checkOutRoutes);
router.use('/markDirtyRoom', markRoutes)

export default router