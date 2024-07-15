import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: localStorage.getItem("profileInfo")
    ? JSON.parse(localStorage.getItem("profileInfo"))
    : null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("profileInfo", JSON.stringify(action.payload));
    },
  
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.profile = null;
      localStorage.removeItem("profileInfo");
    },
  },
});

export const { saveProfile, setProfile, logout } = profileSlice.actions;

export default profileSlice.reducer;
