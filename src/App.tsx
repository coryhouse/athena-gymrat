import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link, Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { getExercises } from "./api/exerciseApi";
import { Exercises } from "./Exercises";
import { Exercise, User } from "./types";

// Lazy load so these are only loaded in local development
const DevTools = React.lazy(() => import("./DevTools"));

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!user?.id) return; // Don't bother fetching exercises until a user is logged in.
        const _exercises = await getExercises(user.id);
        setExercises(_exercises);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [user?.id]);

  if (error) throw error;

  return (
    <>
      {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && (
        <Suspense fallback={<></>}>
          <DevTools user={user} setUser={setUser} />
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

      {isLoading || !user ? (
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
                <Exercises exercises={exercises} setExercises={setExercises} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/add"
            element={
              <AddExercise
                exercises={exercises}
                setExercises={setExercises}
                user={user}
              />
            }
          />
          <Route path="*" element={<h1>Page not found.</h1>} />
        </Routes>
      )}
    </>
  );
}
