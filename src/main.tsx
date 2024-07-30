import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { setupAxios } from "./base-axios/index.ts";

setupAxios(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <BrowserRouter>
  <App />
  // </BrowserRouter>
);
