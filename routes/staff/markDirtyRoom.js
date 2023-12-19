import { Router } from "express";
import * as room from "../../data/room.js";
const router = Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const roomDetails = await room.getAllRooms();
            res.status(200).render("./staff/markRoom", {
                rooms: roomDetails,
                title: "Staff Room Marks",
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
    .route('/clean/:roomNumber')
    .get(async (req, res) => {
        try {
            const roomNumber = parseInt(req.params.roomNumber, 10);

            await  room.cleanRoom(roomNumber);

            res.redirect('/staff/markDirtyRoom?message=Room Cleaned');
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    })

router
    .route('/dirty/:roomNumber')
    .get(async (req, res) => {
        try {
            const roomNumber = parseInt(req.params.roomNumber, 10);

            await  room.dirtyRoom(roomNumber)

            res.redirect('/staff/markDirtyRoom?message=Room is dirty');
        } catch (e) {
            res.status(500).render('error', {
                title: 'Error',
                errorMessage: e.message
            });
        }
    })

export default router