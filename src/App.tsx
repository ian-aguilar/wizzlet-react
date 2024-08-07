import "@/App.css";
import RouterComponent from "@/router";
import useAuthGuard from "./hooks/useAuthGuard";

function App() {
  const { isLoading, isAuthInitialized } = useAuthGuard();

  return (
    <>
      <RouterComponent />
    </>
    // <>{isLoading || !isAuthInitialized ? "Loading" : <RouterComponent />}</>
  );
}

export default App;
