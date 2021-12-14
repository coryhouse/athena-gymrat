import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { getExercises } from "./api/exerciseApi";
import { Exercises } from "./Exercises";
import { Exercise } from "./types";

export function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const _exercises = await getExercises();
      setExercises(_exercises);
      setIsLoading(false);
    }
    fetchData();
  }, []);

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
          <Route path="/" element={<Exercises exercises={exercises} />} />
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
