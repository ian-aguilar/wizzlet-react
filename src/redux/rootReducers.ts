import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as authReducer } from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";

const persistConfig = {
  key: "Import Me",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
});

export default persistReducer(persistConfig, rootReducer);
