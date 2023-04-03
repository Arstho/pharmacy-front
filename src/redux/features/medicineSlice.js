import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  medicines: [],
  medicine: {},
  status: "",
  error: null,
};

export const fetchMedicines = createAsyncThunk("fetch/medicines", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4141/med");
    return await res.json();
  } catch (error) {
    return error;
  }
});

export const fetchMedicineById = createAsyncThunk(
  "fetch/medicineById",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:4141/med/${id}`);
      return await res.json();
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addMedicine = createAsyncThunk(
  "add/medicine",
  async (
    {
      pharmacyName,
      address,
      img,
      name,
      weight,
      methodOfAdministrationAndDose,
      typeOfDosageForm,
      dateOfManufacture,
      expirationDate,
      series,
      price,
      barcode,
      storageConditions,
      countInStock,
      category,
    },
    thunkAPI,
  ) => {
    try {
      const medicine = await fetch("http://localhost:4141/med", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pharmacyName,
          address,
          img,
          name,
          weight,
          methodOfAdministrationAndDose,
          typeOfDosageForm,
          dateOfManufacture,
          expirationDate,
          series,
          price,
          barcode,
          storageConditions,
          countInStock,
          category,
        }),
      });
      return await medicine.json();
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const deleteMedicine = createAsyncThunk("delete/medicine", async (id, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4141/med/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
});

export const updateMedicine = createAsyncThunk("update/medicine", async (id, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4141/med/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
});

export const medicineSlice = createSlice({
  name: "Medicine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMedicineById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedicineById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.medicine = action.payload;
      })
      .addCase(fetchMedicineById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMedicine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMedicine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.medicines.push(action.payload);
      })
      .addCase(addMedicine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteMedicine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMedicine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.medicines = state.medicines.filter(
          (medicine) => medicine.id !== action.payload.id
        );
      })
      .addCase(deleteMedicine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateMedicine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMedicine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.medicines = state.medicines.map((medicine) =>
          medicine.id === action.payload.id ? action.payload : medicine
        );
      })
      .addCase(updateMedicine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default medicineSlice.reducer;
