import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link, Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { getExercises } from "./api/exerciseApi";
import { Exercises } from "./Exercises";
import { Exercise } from "./types";

export function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const _exercises = await getExercises();
        setExercises(_exercises);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  if (error) throw error;

  return (
    <>
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

      {isLoading ? (
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
              <AddExercise exercises={exercises} setExercises={setExercises} />
            }
          />
          <Route path="*" element={<h1>Page not found.</h1>} />
        </Routes>
      )}
    </>
  );
}
