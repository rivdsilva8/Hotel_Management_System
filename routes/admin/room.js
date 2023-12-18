// Admin can create, edit, delete and see all the rooms in this page:
// Create room : room number, room type, room price, availability, room photos link, room description from input will be acepteed
// edit room: we cna edit all the details
// delete: we need to add the room number and type to delete the room from the database

import { Router } from "express";
import multer from "multer";


import * as room from '../../data/room.js'


const router = Router();
const upload = multer();
router
    .route('/')
    .get(async (req, res) => {
    try {
        const roomDetails = await room.getAllRooms();
        res.status(200).render("./Admin/adminRoom/roomList", {
            rooms: roomDetails,
            title: "admin Room",
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
    .route('/delete')
    .get(async (req, res) => {
        try {
            const { roomNumber } = req.query;
            res.render('./Admin/adminRoom/removeRoom', { roomNumber ,title: "Delete Room"});
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    })
    .post(async (req, res) => {
        try {

            const roomNumber = parseInt(req.body.roomNumber, 10);
            if (isNaN(roomNumber)) {
                throw new Error("Invalid room number");
            }
            await room.deleteRoom(roomNumber);
            res.redirect('/admin/room?message=Room Deleted');

        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }

});

router
    .route('/create')
    .get(async (req, res) => {
        res.render('./Admin/adminRoom/createRoom',{title:"Add New Room"});
    })
    .post(async (req, res) => {
        try {
            const roomNumber = parseInt(req.body.roomNumber, 10);
            const roomPrice = parseFloat(req.body.roomPrice);
            const availability = req.body.availability === 'true';
            const cleanStatus = req.body.cleanStatus === 'true';

            let { roomType, roomDescription } = req.body;

            console.log(roomType)


            if (isNaN(roomNumber) || isNaN(roomPrice)) {
                throw new Error("Invalid room number or price");
            }

            await room.createRoom(roomNumber, roomType, roomPrice, availability, roomDescription, cleanStatus);
            res.redirect('/admin/room?message=Room Created');
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    });

router
    .route('/update/:roomNumber')
    .get(async (req, res) => {
        try {
            const roomNumber = parseInt(req.params.roomNumber, 10);
            const newRoom = await room.getRoomByNumber(roomNumber);
            res.render('./Admin/adminRoom/updateRoom', { room: newRoom , title:"Update Room"});
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    })

router
    .route('/update')
    .post(async (req, res) => {
        try {

            const { roomType, roomDescription } = req.body;

            const originalRoomNumber = parseInt(req.body.originalRoomNumber, 10);
            const newRoomNumber = parseInt(req.body.roomNumber, 10);
            const roomPrice = parseFloat(req.body.roomPrice);
            const availability = req.body.availability === 'true';


            const updatedRoom = await room.updateRoom(
                originalRoomNumber,
                newRoomNumber,
                roomType,
                roomPrice,
                availability,
                roomDescription
            );


            res.redirect('/admin/room?message=Room Updated');
        } catch (e) {

            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    });

router
    .route('/clean/:roomNumber')
    .get(async (req, res) => {
        try {
            const roomNumber = parseInt(req.params.roomNumber, 10);
            console.log(roomNumber)

            await  room.cleanRoom(roomNumber);
            console.log("Room cleaned successfully.");
            res.redirect('/admin/room?message=Room Cleaned');
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    })


router
    .get('/upload', async (req, res) => {
        try {
            const photoDetails = await room.getAllPhotos();
            res.status(200).render("./Admin/adminRoom/roomPhotos", {
                rooms: photoDetails,
                title: "Room photos",
                message: req.query.message
            });
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }

    })
    .post('/upload', upload.single('image'), async (req, res) => {
    try {
        const downloadURL = await room.uploadImageToFirebase(req.file);
        const roomType = req.body.roomType;

        const savePhoto = await room.savePhoto(roomType, downloadURL);

        res.redirect('/admin/room/upload?message=Image uploaded successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router
    .route('/photo')
    .post(async (req, res) => {
        try {
            const { roomType } = req.body;
            if (!roomType) {
                throw new Error('Room type is required');
            }

            const newPhoto = await room.createPhotos(roomType, []);

            res.redirect('/admin/room/upload?message=New room Type updated');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });


export default router;
