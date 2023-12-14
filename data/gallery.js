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

// export const saveGalleryDetailsToMongoDB = async (imageData) => {
//   const GalleryData = await gallery();
//   const InsertGalleryData = await GalleryData.insertOne(imageData);
//   if (InsertGalleryData.insertedCount === 0) throw new Error('Could not add image details to MongoDB.');
//   return InsertGalleryData.insertedId;
// }


export const saveImageDetailsToMongoDB = async (roomDetails) => {
    const GalleryData = await gallery();
    const insertInfo = await GalleryData.insertOne(roomDetails);
    if (insertInfo.insertedCount === 0) throw new Error('Could not add room details to MongoDB.');
    return insertInfo.insertedId;
};