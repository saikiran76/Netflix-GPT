import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    phoneNumber: null,
    isGuest: false,
    bucketList: [],
  },
  reducers: {
    addUser: (state, action) => {
      return { ...state, ...action.payload, isGuest: false };
    },
    removeUser: (state) => {
      return {
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        phoneNumber: null,
        isGuest: false,
        bucketList: [],
      };
    },
    setGuestUser: (state) => {
      return {
        uid: "guest",
        email: "guest@example.com",
        displayName: "Guest User",
        photoURL: null,
        phoneNumber: null,
        isGuest: true,
        bucketList: [],
      };
    },
    addToBucketList(state, action) {
      const movieId = action.payload;
      if (!state.bucketList.includes(movieId)) {
        state.bucketList.push(movieId);
      }
    },
    removeFromBucketList: (state, action) => {
      state.bucketList = state.bucketList.filter((movieId) => movieId !== action.payload);
    },
  },
});

export const { addUser, removeUser, setGuestUser, addToBucketList, removeFromBucketList } = userSlice.actions;

export default userSlice.reducer;
