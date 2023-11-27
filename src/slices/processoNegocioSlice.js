import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import processoNegocioService from "../services/processoNegocioService";

const initialState = {
    processoNegocios: [],
    processoNegocio: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};


export const publishProcessoNegocio = createAsyncThunk(
    "processoNegocio/publish",
    async (processoNegocio, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await processoNegocioService.publishProcessoNegocio(processoNegocio, token);

        // Check for errors
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const processoNegocioSlice = createSlice({
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
            .addCase(publishProcessoNegocio.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(publishProcessoNegocio.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.processoNegocio = action.payload;
                state.processoNegocios.unshift(state.processoNegocio);
                state.message = "Processo de negócio publicado com sucesso!";
            })
            .addCase(publishProcessoNegocio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.processoNegocio = {};
            })

    },
});

export const { resetMessage, resetError } = processoNegocioSlice.actions;
export default processoNegocioSlice.reducer;