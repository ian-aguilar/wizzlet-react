import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as authReducer } from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";
import { reducer as userReducer } from "./slices/userSlice";
import { reducer as socketReducer } from "./slices/socketSlice"; // Import the socket reducer
import { sidebarReducer } from "./slices/sidebarSlice";

const persistConfig = {
  key: "Import Me",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  user: userReducer,
  socket: socketReducer,
  sidebar: sidebarReducer,
});

export default persistReducer(persistConfig, rootReducer);
