import logger from "redux-logger";
import { Middleware } from "redux";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "@/redux/rootReducers";

const Middlewares: Middleware[] = [logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Middlewares),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
const exportStore = { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default exportStore;
