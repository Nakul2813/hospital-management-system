import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/auth.service";

export const loginUser = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await authService.login(payload);
    if (res.data.accessToken) localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const registerUser = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await authService.register(payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

export const fetchCurrentUser = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await authService.getMe();
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Not authenticated");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  localStorage.removeItem("accessToken");
});

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle", // idle | loading | succeeded | failed
  bootstrapped: false, // whether we've checked for an existing session on app load
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch current user (session bootstrap)
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.bootstrapped = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "idle";
        state.user = null;
        state.isAuthenticated = false;
        state.bootstrapped = true;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
