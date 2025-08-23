import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFromUserFeed: (state, action) => {
            const newUserArray = state.filter((item) => item._id != action.payload);
            return newUserArray;
        }
    }
})

export const {addFeed, removeFromUserFeed} = feedSlice.actions
export default feedSlice.reducer