import { createSlice } from "@reduxjs/toolkit";

const userGetFormSlice = createSlice({
    name: "userForm",
    initialState: {
        userForm: null
    },
    reducers: {
        // actions
        setUserForm: (state, action) => {
            state.userForm = action.payload;
        }
    }
});
export const { setUserForm } = userGetFormSlice.actions;
export default userGetFormSlice.reducer;