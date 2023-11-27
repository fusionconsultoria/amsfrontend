import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import historyService from "../services/historyService";

const initialState = {
    histories: [],
    history: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Publish a history 
export const insertHistory = createAsyncThunk(
    "history/publish",
    async (noteData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await historyService.insertHistory(
            {
                descricao: noteData.descricao,
                data: noteData.data,

            },
            noteData._id,
            token
        );

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Get history
export const getHistory = createAsyncThunk("history/gethistory", async (id) => {
    const data = await historyService.getHistory(id);

    return data;
});

// Delete a history
export const deleteHistory = createAsyncThunk(
    "history/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await historyService.deleteHistory(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);


export const historySlice = createSlice({
    name: "publish",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertHistory.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(insertHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.history = action.payload; 
                state.histories.unshift(state.history);
                state.message = "História publicada com sucesso!";
            })
            .addCase(insertHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.history = {};
            })

            .addCase(getHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.histories = action.payload;
            })
            .addCase(deleteHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.histories = state.histories.filter((history) => {
                    return history._id !== action.payload.id; 
                });

                state.message = action.payload.message;
            })

            .addCase(deleteHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.history = null;
            })
    },
});

export const { resetMessage } = historySlice.actions;
export default historySlice.reducer;