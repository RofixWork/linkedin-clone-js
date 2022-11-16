import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../firebase";

export const StorageSlice = createSlice({
  name: "storage",
  initialState: {
    posts: null,
    loading: false,
  },
  reducers: {
    uploadImage: (state, action) => {
      console.log("payload", action.payload);
      const { image, video } = action.payload;
      if (image !== "") {
        const storageRef = ref(storage, `images/${image.name}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(error.message);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              addDoc(collection(db, "posts"), {
                ...action.payload,
                image: downloadURL,
              });
            });
          }
        );
      } else if (video !== "") {
        addDoc(collection(db, "posts"), {
          ...action.payload,
        });
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { uploadImage, setPosts } = StorageSlice.actions;
export default StorageSlice.reducer;
