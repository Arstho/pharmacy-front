import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './features/categorySlice'
import medicineSlice from './features/medicineSlice'
import pharmacySlice from './features/pharmacySlice'


export const store = configureStore({
  reducer: {
    category: categorySlice,
    medicine: medicineSlice,
    pharmacy: pharmacySlice,
  },
})
