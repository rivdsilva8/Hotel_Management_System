// CREATE, GET ALL, DELETE
// CREATE: string link

import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseConfig.js";
import { gallery } from "../config/mongoCollections.js";
import * as helper from '../helpers.js'

export const uploadImageToFirebase = async (file) => {
    try {
        const storageRef = ref(storage, `images/${file.originalname}`);
        const snapshot = await uploadBytes(storageRef, file.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (e) {
        throw `Error: ${e}`;
    }
};

export const deleteImageFromFirebase = async (fileName) => {
    try {
        helper.stringValidation(fileName);
        const storageRef = ref(storage, `images/${fileName}`);
        await deleteObject(storageRef);
    } catch (e) {
        throw `Error: ${e}`;
    }
};

export const GetAllFromMongoDB = async () => {
    try {
        const GalleryData = await gallery();
        const insertInfo = await GalleryData.find({}, { projection: { url: 1, filename: 1 } }).toArray();
        return insertInfo.map(doc => ({ url: doc.url, fileName: doc.filename }));
    } catch (e) {
        throw `Error: ${e}`;
    }
};



export const saveImageDetailsToMongoDB = async (roomDetails) => {
    try {
        const GalleryData = await gallery();
        const insertInfo = await GalleryData.insertOne(roomDetails);
        if (insertInfo.insertedCount === 0) throw new Error('Could not add room details to MongoDB.');
        return { fileName: roomDetails.fileName, info: insertInfo.insertedCount };
    } catch (e) {
        throw `Error: ${e}`;
    }
};

export const deleteImageFromMongoDB = async (fileName) => {
    try {
        helper.stringValidation(fileName);
        const GalleryData = await gallery();
        let deletedImageData = await GalleryData.deleteOne({ filename: fileName });
        if (deletedImageData.deletedCount === 0) {
            console.log(`No document found with filename '${fileName}'`);
            return { deleted: false, reason: "No document found with provided filename" };
        }

        return { ...deletedImageData, deleted: true };
    } catch (e) {
        throw `Error: ${e}`;
    }
}