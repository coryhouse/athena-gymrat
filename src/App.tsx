import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { Exercises } from "./Exercises";
import { Exercise } from "./types";

export function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Exercises exercises={exercises} />} />
      <Route
        path="/add"
        element={
          <AddExercise exercises={exercises} setExercises={setExercises} />
        }
      />
    </Routes>
  );
}
