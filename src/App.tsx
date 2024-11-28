import "@/App.css";
import RouterComponent from "@/router";
import useAuthGuard from "./hooks/useAuthGuard";
import { Loader } from "./components/common/Loader";

function App() {
  const { isLoading } = useAuthGuard();

  return (
    // <>
    //   <RouterComponent />
    // </>
    <>{isLoading ? <Loader /> : <RouterComponent />}</>
  );
}

export default App;
