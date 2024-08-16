import "@/App.css";
import RouterComponent from "@/router";
import useAuthGuard from "./hooks/useAuthGuard";

function App() {
  const { isLoading } = useAuthGuard();

  return (
    // <>
    //   <RouterComponent />
    // </>
    <>{isLoading ? "Loading" : <RouterComponent />}</>
  );
}

export default App;
