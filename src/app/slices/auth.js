import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.error(err));
    },
    // set user
    setUser: (state, action) => {
      const user = action.payload;
      state.user = {
        username: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      };
    },
    // reset user
    resetUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { login, setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
