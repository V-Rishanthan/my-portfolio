// src/hooks/useFirestore.js
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/confic";

/**
 * Professional Firestore Hook
 * @param {string} fbCollection - Firestore collection name
 */
export const useFirestore = (fbCollection) => {
  const collectionRef = collection(db, fbCollection);

  //  CREATE
  const addDocument = async (data) => {
    const payload = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collectionRef, payload);
    return docRef;
  };

  //  READ ONE
  const getDocument = async (id) => {
    const docRef = doc(db, fbCollection, id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  };

  //  READ ALL (latest first)
  const getAllDocuments = async () => {
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  };

  //  UPDATE
  const updateDocument = async (id, data) => {
    const docRef = doc(db, fbCollection, id);

    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return true;
  };

  //  DELETE
  const deleteDocument = async (id) => {
    const docRef = doc(db, fbCollection, id);
    await deleteDoc(docRef);
    return true;
  };

  //  IMAGE UPLOAD (Firebase Storage)
  const uploadImage = async (file, folder = "project") => {
    if (!file) throw new Error("File is required");

    // unique file name
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return { url, path: storageRef.fullPath };
  };

  //  DELETE IMAGE
  const deleteImage = async (path) => {
    if (!path) return;
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  };

  return {
    addDocument,
    getDocument,
    getAllDocuments,
    updateDocument,
    deleteDocument,
    uploadImage,
    deleteImage,
  };
};
