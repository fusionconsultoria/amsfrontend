import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    users: [],
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.profile(user, token);

        return data;
    }
);

export const updateProfile = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.updateProfile(user, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const getUserDetails = createAsyncThunk(
    "user/get",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.getUserDetails(id, token);

        return data;
    }
);

export const getAllUsers = createAsyncThunk(
    "user/getAll",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.getAllUsers(token);

        return data;
    }
);

export const deleteUser = createAsyncThunk(
    "user/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.deleteUser(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
                state.message = "Usuário atualizado com sucesso!";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false;
                state.success = true;
                state.error = null;
                state.users = action.payload.users;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.users = state.users.filter((user) => {
                    return user._id !== action.payload.id;
                });

                state.message = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
    },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;