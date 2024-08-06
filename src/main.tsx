import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { setupAxios } from "./base-axios/index.ts";
import { Provider } from "react-redux";
import ToastNotification from "./components/toastNotification/ToastNotification.tsx";

setupAxios(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastNotification />
    <App />
  </Provider>
);
