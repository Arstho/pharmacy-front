import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authExit = createAsyncThunk("auth/exit", async (_, thunkAPI) => {
  localStorage.removeItem("token");
});

export const registerPharmacy = createAsyncThunk(
  "auth/register",
  async ({ pharmacyName, password, address, license, ogrn, inn }) => {
    const response = await fetch("http://localhost:4141/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pharmacyName, password, address, license, ogrn, inn }),
    });
    const data = await response.json();
    if (data.token) {
      window.localStorage.setItem("token", data.token);
    }
    return data;
  }
);

export const loginPharmacy = createAsyncThunk("auth/login", async ({ pharmacyName, password }) => {
  const response = await fetch("http://localhost:4141/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pharmacyName, password }),
  });
  const data = await response.json();
  if (data.token) {
    window.localStorage.setItem("token", data.token);
  }
  return data;
});

export const getPharmacies = createAsyncThunk("get/Pharmacies", async () => {
  const response = await fetch("http://localhost:4141/pharmacy");
  return await response.json();
});

export const getPharmacy = createAsyncThunk("get/pharmacy", async ({ id }) => {
  const response = await fetch(`http://localhost:4141/pharmacy:${id}`);
  return await response.json();
});

export const deletePharmacyByName = createAsyncThunk("delete/pharmacy", async (name) => {
  await fetch(`http://localhost:4141/${name}`, { method: "DELETE" });
  return name;
});

const pharmacySlice = createSlice({
  name: "auth",
  initialState: {
    pharmacy: null,
    pharmacies: [],
    token: localStorage.getItem("token") || null,
    isLoading: false,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authExit.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(authExit.fulfilled, (state) => {
        state.token = null;
        state.pharmacy = null;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(registerPharmacy.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(registerPharmacy.fulfilled, (state, action) => {
        state.pharmacy = action.payload;
        state.token = action.payload.token;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(registerPharmacy.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.error.message;
      })
      .addCase(loginPharmacy.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginPharmacy.fulfilled, (state, action) => {
        state.pharmacy = action.payload;
        state.token = action.payload.token;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(loginPharmacy.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.error.message;
      })
      .addCase(getPharmacies.fulfilled, (state, action) => {
        state.pharmacies = action.payload;
      })
      .addCase(getPharmacy.fulfilled, (state, action) => {
        state.pharmacy = action.payload;
      })
      .addCase(deletePharmacyByName.fulfilled, (state, action) => {
        state.pharmacies = state.pharmacies.filter((pharmacy) => pharmacy.pharmacyName !== action.payload);
      });
  },
});

export const checkIsAuth = (state) => Boolean(state.pharmacy.token)
export const { logout } = pharmacySlice.actions;
export default pharmacySlice.reducer;
