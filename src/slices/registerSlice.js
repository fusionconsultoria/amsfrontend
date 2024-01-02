import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerService from "../services/registerService";

const initialState = {
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Register a user and sign in
export const register = createAsyncThunk(
    "register/register",
    async (user, thunkAPI) => {
        try {
            const data = await registerService.register(user);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Usuário cadastrado com sucesso!";
                // Note: You may update the state.user if needed based on your requirements.
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Note: You may handle the error as needed.
            })
    },
});

export const { reset } = registerSlice.actions;
export default registerSlice.reducer;