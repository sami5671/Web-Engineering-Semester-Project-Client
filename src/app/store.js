import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/Api/apiSlice";
import authSliceReducer from "../Features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
