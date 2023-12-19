import { Router } from "express";
import * as room from "../../data/room.js";
const router = Router();

router
    .route('/')
    .get(async (req, res) => {
      try {
        const roomDetails = await room.getAllRooms();
        res.status(200).render("./guest/guestRoom/room", {
          rooms: roomDetails,
          title: "Room Details",
          message: req.query.message
        });
      } catch (e) {
        res.status(500).render('error', {
          title: 'Error',
          errorMessage: e.message
        });
      }
    });

  router
    .route('/booking/:roomNumber')
    .post(async (req, res) => {
        try {
            const roomNumber = parseInt(req.params.roomNumber, 10);
            const roomId = await room.roomNumberToId(roomNumber);
            res.render('./guest/guestBooking/booking', { room: roomId,title:"RoomBooking", roomNumber: req.body.roomNumber, roomType: req.body.roomType, roomPrice: req.body.roomPrice});
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    })

// router
//     .route('/booking/:roomNumber')
//     .get(async (req, res) => {
//         try {
//             const roomNumber = parseInt(req.params.roomNumber, 10);
//             const roomId = await room.roomNumberToId(roomNumber);
//             res.render('./guest/guestBooking/booking', { room: roomId });
//         } catch (e) {
//             res.status(500).render('error', {
//                 title: 'Error',
//                 errorMessage: e.message
//             });
//         }
//     })

export default router;