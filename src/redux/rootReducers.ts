import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";

const persistConfig = {
  key: "Import Me",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  toast: toastReducer,
});

export default persistReducer(persistConfig, rootReducer);
