import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../services/noteService";

const initialState = {
    notes: [],
    note: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Publish an user's photo
export const publishNote = createAsyncThunk(
    "note/publish",
    async (note, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await noteService.publishNote(note, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Get user photos
export const getUserNotes = createAsyncThunk(
    "notes/user",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await noteService.getUserNotes(id, token);

        return data;
    }
);

// Delete a note
export const deleteNote = createAsyncThunk(
    "note/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await noteService.deleteNote(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Get note
export const getNote = createAsyncThunk("note/getnote", async (id) => {
    const data = await noteService.getNote(id);

    return data;
});


export const searchNotes = createAsyncThunk(
    "note/search",
    async (query) => {

        const data = await noteService.searchNotes(query);

        return data;
    }
);

// Get all notes
export const getNotes = createAsyncThunk("note/getall", async () => {
    const data = await noteService.getNotes();

    return data;
});


// Update a note
export const updateNote = createAsyncThunk(
    "note/update",
    async (noteData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await noteService.updateNote(
            {
                titulo: noteData.titulo,
                modulo: noteData.modulo,
                cliente: noteData.cliente,
                consultor: noteData.consultor,
                solicitacao: noteData.solicitacao,
                prioridade: noteData.prioridade,
                origemSolicitacao: noteData.origemSolicitacao,
                termoBusca: noteData.termoBusca,
                processoNegocio: noteData.processoNegocio,
                descricaoFuncional: noteData.descricaoFuncional,
                referenciaFt: noteData.referenciaFt,
                cutover: noteData.cutover,
                request: noteData.request,
                definicaoProblema: noteData.definicaoProblema,
                causaProblema: noteData.causaProblema,
                alternativaSolucao: noteData.alternativaSolucao,
                pedidoMelhoria: noteData.pedidoMelhoria,
                reproducaoProblema: noteData.reproducaoProblema,
                reproducaoProcesso: noteData.reproducaoProcesso,
                esclarecimentoDuvida: noteData.esclarecimentoDuvida,
                duvida: noteData.duvida,
                reproducaoErro: noteData.reproducaoErro,
                descricaoSolucao: noteData.descricaoSolucao,
                configuracoesExecutadas: noteData.configuracoesExecutadas,
                objetosAbap: noteData.objetosAbap,
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

export const noteSlice = createSlice({
    name: "publish",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishNote.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(publishNote.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.note = action.payload;
                state.notes.unshift(state.note);
                state.message = "Note publicado com sucesso!";
            })
            .addCase(publishNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.note = {};
            })
            .addCase(getUserNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.notes = action.payload;
            })
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.notes = state.notes.filter((note) => {
                    console.log('oiiii' + action.payload.id);
                    return note._id !== action.payload.id;
                });

                state.message = action.payload.message;
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.note = null;
            })
            .addCase(getNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNote.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.note = action.payload;
            })
            .addCase(searchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.notes = action.payload;
            })
            .addCase(getNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.notes = action.payload.notes;
            })
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.notes.map((note) => {
                    if (note._id === action.payload.note._id) {
                        return (note = action.payload.note);
                    }
                    return note;
                });

                state.message = action.payload.message;
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.note = null;
            })
    },
});

export const { resetMessage } = noteSlice.actions;
export default noteSlice.reducer;