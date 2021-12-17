import { render } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

function Fallback() {
  return <p>Oops, an error occurred.</p>;
}

const queryClient = new QueryClient();

render(
  <ErrorBoundary FallbackComponent={Fallback}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);
