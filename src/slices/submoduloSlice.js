import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import submoduloService from "../services/submoduloService";

const initialState = {
    submodulos: [],
    submodulo: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};


export const publishSubmodulo = createAsyncThunk(
    "submodulo/publish",
    async (submodulo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await submoduloService.publishSubmodulo(submodulo, token);

        // Check for errors
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const submoduloSlice = createSlice({
    name: "publish",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishSubmodulo.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(publishSubmodulo.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.submodulo = action.payload;
                state.submodulos.unshift(state.submodulo);
                state.message = "Submodulo publicado com sucesso!";
            })
            .addCase(publishSubmodulo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.submodulo = {};
            })

    },
});

export const { resetMessage, resetError } = submoduloSlice.actions;
export default submoduloSlice.reducer;