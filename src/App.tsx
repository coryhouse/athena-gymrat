import React, { Suspense } from "react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link, Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { Exercises } from "./Exercises";
import { User } from "./types";
import { UserContextProvider } from "./UserContext";

// Lazy load so these are only loaded in local development
const DevTools = React.lazy(() => import("./DevTools"));

export const defaultUser: User = {
  id: 1,
  email: "2-exercises@email.com",
  password: "1",
};

export function App() {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContextProvider user={user} setUser={setUser}>
      {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && (
        <Suspense fallback={<></>}>
          <DevTools />
        </Suspense>
      )}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Exercise</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => {
                return <p>Sorry, exercises is currently down.</p>;
              }}
            >
              <Exercises />
            </ErrorBoundary>
          }
        />
        <Route path="/add" element={<AddExercise />} />
        <Route path="*" element={<h1>Page not found.</h1>} />
      </Routes>
    </UserContextProvider>
  );
}
