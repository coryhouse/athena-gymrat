import React, { Suspense } from "react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";
import { Link, Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { getExercises } from "./api/exerciseApi";
import { Exercises } from "./Exercises";
import { Exercise, User } from "./types";
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
  const exerciseQuery = useQuery<Exercise[]>(["exercises", user.id], () =>
    getExercises(user.id)
  );

  if (exerciseQuery.error) throw exerciseQuery.error;

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

      {exerciseQuery.isLoading || !exerciseQuery.data ? (
        "Loading..."
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => {
                  return <p>Sorry, exercises is currently down.</p>;
                }}
              >
                <Exercises exercises={exerciseQuery.data} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/add"
            element={<AddExercise exercises={exerciseQuery.data} />}
          />
          <Route path="*" element={<h1>Page not found.</h1>} />
        </Routes>
      )}
    </UserContextProvider>
  );
}
