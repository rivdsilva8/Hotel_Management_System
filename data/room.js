// CREATE, GET, GET ALL, EDIT, DELETE
// Create room : room number, room type, room price, availability, room photos link, room description from input will be acepteed
// edit room: we can edit all the details
// delete: we need to add the room number and type to delete the room from the database
// GET or GET ALL: get will show the details of the rooom after the guest selects a specific room number
// and get all will show all the room deails and its photos in one page


import { ObjectId } from "mongodb";
import { rooms } from "../config/mongoCollections.js";
import { photos } from "../config/mongoCollections.js";
import * as helpers from '../helpers.js'
import * as connection from '../config/mongoConnection.js'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseConfig.js";



export const createRoom = async (
    roomNumber,
    roomType,
    roomPrice,
    availability,
    roomPhotos,
    roomDescription,
    cleanStatus

) => {
    helpers.validateRoomData({
        roomNumber,
        roomType,
        roomPrice,
        availability,
        roomPhotos,
        roomDescription,
        cleanStatus
    });

    const newRoom = {
        roomNumber,
        roomType,
        roomPrice,
        availability,
        roomPhotos,
        roomDescription,
        cleanStatus
    }

    const roomCollection = await rooms();
    const existingRoom = await roomCollection.findOne({ roomNumber });
    if (existingRoom) {
        throw new Error("Room number already exists");
    }

    const addNewRooms = await roomCollection.insertOne(newRoom);
    if (addNewRooms.insertedCount === 0) throw new Error("Room add failed");

    const id = addNewRooms.insertedId;
    const addedNewRoom = await roomCollection.findOne({ _id: id });
    if (!addedNewRoom) throw new Error('No room id found');

    return addedNewRoom;


}

export const getAllRooms = async () => {
    try {
        const roomCollection = await rooms();
        let allRooms = await roomCollection.find({}).toArray();
        return allRooms;
    } catch (e) {
        throw e;
    }
}

export const getRoomByNumber = async (roomNumber) => {
    try {
        helpers.validateRoomNumber(roomNumber);
        const roomCollection = await rooms();
        let room = await roomCollection.findOne({ roomNumber: roomNumber});

        if (!room) throw new Error(`This number: ${roomNumber} has no room`);

        return room;

    } catch (e) {
        throw e;
    }
}

export const deleteRoom = async (roomNumber) => {
    helpers.validateRoomNumber(roomNumber);
    const roomCollection = await rooms();
    const deleteResult = await roomCollection.deleteOne({
        roomNumber: roomNumber
    });

    if (deleteResult.deletedCount === 0) {
        throw new Error("Number and type is not exist")
    } else {
        return roomNumber;
    }
}

export const updateRoom = async (
    originalRoomNumber,
    newRoomNumber,
    roomType,
    roomPrice,
    availability,
    roomPhotos,
    roomDescription
) => {
    helpers.validateRoomNumber(originalRoomNumber);
    helpers.validateRoomData({
        roomNumber: newRoomNumber,
        roomType,
        roomPrice,
        availability,
        roomPhotos,
        roomDescription
    });

    const roomCollection = await rooms();

    const updatedRoom = {
        roomNumber: newRoomNumber,
        roomType,
        roomPrice,
        availability,
        roomPhotos,
        roomDescription
    };

    const updateResult = await roomCollection.updateOne(
        { roomNumber: originalRoomNumber },
        { $set: updatedRoom }
    )

    if (updateResult.modifiedCount === 0) {
        throw new Error("No room found or No changes")
    }

    const newRoom = await roomCollection.findOne({ roomNumber: newRoomNumber});
    return newRoom;
}

export const cleanRoom = async (roomNumber) => {
    helpers.validateRoomNumber(roomNumber);
    const roomCollection = await rooms();
    let room = await roomCollection.findOne({ roomNumber: roomNumber});

    if (!room) throw new Error(`This number: ${roomNumber} has no room`);
    room.cleanStatus = true;

    await roomCollection.updateOne(
        { roomNumber: roomNumber},
        { $set: { cleanStatus: true }}
    );


}

export const roomNumberToId = async (roomNumber) => {
    helpers.validateRoomNumber(roomNumber);
    const roomCollection = await rooms();
    let room = await roomCollection.findOne({ roomNumber: roomNumber});

    if (!room) throw new Error(`This number: ${roomNumber} has no room`);

    return room._id;
}

export const getAllPhotos = async () => {

    try {
        const photoCollection = await photos();
        let allPhotos = await photoCollection.find({}).toArray();
        return allPhotos;
    } catch (e) {
        throw e;
    }

}

export const createPhotos = async (roomType, url) => {
    const photoCollection = await photos();


    const existingPhoto = await photoCollection.findOne({ roomType: roomType });
    if (existingPhoto) {
        throw new Error(`A photo with roomType '${roomType}' already exists.`);
    }

    const newPhoto = {
        roomType: roomType,
        url: url
    };

    const result = await photoCollection.insertOne(newPhoto);

    if (result.acknowledged && result.insertedId) {
        console.log(`New photo added with ID: ${result.insertedId}`);
        return await photoCollection.findOne({ _id: result.insertedId });
    } else {
        throw new Error('Failed to insert new photo');
    }
};

export const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `images/${file.originalname}`);
    const snapshot = await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};

export const saveUrlToPhotos = async (roomDetails) => {
    const roomData = await rooms();
    const insertInfo = await roomData.insertOne(roomDetails);
    if (insertInfo.insertedCount === 0) throw new Error('Could not add room details to MongoDB.');
    return insertInfo.insertedId;
};

export const runApp = async () => {
    const db = await connection.dbConnection();
    // await db.dropDatabase;
    try {

        // const newRoom = await createRoom(
        //     106,
        //     'double',
        //     157.00,
        //     true,
        //     ["https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2Fmessaging.jpeg?alt=media&token=5e36cb50-cc8f-40ec-bb38-25b221c33ee9"],
        //     'A spacious double room.',
        //     true
        // );
        //
        // console.log(newRoom)

        // const result = await averageRating("single");
        // console.log(result)

        const photo1 = await createPhotos(
            "single",
            "https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2Fsingle.jpg?alt=media&token=43ffeb30-7766-434e-8af0-b457d7c6f8aa"
        );
        const photo2 = await createPhotos(
            "double",
            "https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2Fdouble.jpg?alt=media&token=c2a38310-dc60-4d21-9398-8fa53fee2373"
        );
        const photo3 = await createPhotos(
            "suite",
            "https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2Fsuite.jpg?alt=media&token=875158ff-8969-48cd-8359-d54e6e7e7fec"
        );
        console.log(photo1)
        console.log(photo2)
        console.log(photo3)


    } catch (e) {
        console.error(e.message)
    } finally {
        //Finish connection
        await connection.closeConnection();
        console.log('Done!');
    }

}

// runApp();



