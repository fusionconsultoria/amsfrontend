import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moduloService from "../services/moduloService";

const initialState = {
    modulos: [],
    modulo: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Get all modulos
export const getModulos = createAsyncThunk("modulo/getall", async () => {
    const data = await moduloService.getModulos();

    return data;
});

// Get note
export const getModulo = createAsyncThunk("note/getnote", async (id) => {
    const data = await moduloService.getModulo(id);

    return data;
});

export const publishModulo = createAsyncThunk(
    "modulo/publish",
    async (modulo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await moduloService.publishModulo(modulo, token);

        // Check for errors
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const moduloSlice = createSlice({
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
            .addCase(getModulo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getModulo.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.modulo = action.payload;
            })
            .addCase(getModulos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getModulos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.modulos = action.payload;
            })
            .addCase(publishModulo.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(publishModulo.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.modulo = action.payload;
                state.modulos.unshift(state.modulo);
                state.message = "Módulo publicado com sucesso!";
            })
            .addCase(publishModulo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.modulo = {};
            })

    },
});

export const { resetMessage, resetError } = moduloSlice.actions;
export default moduloSlice.reducer;