import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
    name: "template",
    initialState: {
        templates: null
    },
    reducers: {
        // actions

        setTemplate: (state, action) => {
            state.templates = action.payload;
        }
    }
});
export const { setTemplate } = templateSlice.actions;
export default templateSlice.reducer;