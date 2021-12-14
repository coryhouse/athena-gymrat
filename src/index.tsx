import { render } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

function Fallback() {
  return <p>Oops, an error occurred.</p>;
}

render(
  <ErrorBoundary FallbackComponent={Fallback}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
