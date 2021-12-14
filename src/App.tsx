import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { Exercises } from "./Exercises";
import { Exercise } from "./types";

export function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

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
      <Routes>
        <Route path="/" element={<Exercises exercises={exercises} />} />
        <Route
          path="/add"
          element={
            <AddExercise exercises={exercises} setExercises={setExercises} />
          }
        />
      </Routes>
    </>
  );
}
