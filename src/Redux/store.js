import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./apiService";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddkeware) =>
    getDefaultMiddkeware().concat(apiService.middleware),
});
