// CREATE, GET ALL, DELETE
// CREATE: string link

import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseConfig.js";
import { gallery } from "../config/mongoCollections.js";

export const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `images/${file.originalname}`);
    const snapshot = await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};

export const deleteImageFromFirebase = async (fileName) => {
    const storageRef = ref(storage, `images/${fileName}`);
    await deleteObject(storageRef);
};

export const GetAllFromMongoDB = async () => {
    console.log("In data function");
    const GalleryData = await gallery();
    const insertInfo = await GalleryData.find({}, { projection: { url: 1, filename:1 } }).toArray();
    return insertInfo.map(doc => ({ url: doc.url, fileName: doc.filename }));
};



export const saveImageDetailsToMongoDB = async (roomDetails) => {
    const GalleryData = await gallery();
    const insertInfo = await GalleryData.insertOne(roomDetails);
    if (insertInfo.insertedCount === 0) throw new Error('Could not add room details to MongoDB.');
    return {fileName: roomDetails.fileName, info:insertInfo.insertedCount};
};

export const deleteImageFromMongoDB = async (fileName) => {
    const GalleryData = await gallery();
    console.log(fileName,'in routes');
   let deletedImageData =  await GalleryData.deleteOne({ filename: fileName });
   console.log(deletedImageData,'image data');
   if (deletedImageData.deletedCount === 0) {
    console.log(`No document found with filename '${fileName}'`);
    return { deleted: false, reason: "No document found with provided filename" };
}

    return {...deletedImageData, deleted: true};
}