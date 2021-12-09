import { ChangeEvent, useState } from "react";
import { Input } from "./reusable/Input";

type NewExercise = {
  exercise: string;
  weight: string;
};

type Exercise = {
  id: number;
  exercise: string;
  weight: string;
};

const newExercise: NewExercise = {
  exercise: "",
  weight: "",
};

export function App() {
  const [exercise, setExercise] = useState(newExercise);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setExercise({
      ...exercise,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <>
      <h1>Gymrat</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault(); // Don't post back
          setExercises([
            ...exercises,
            {
              exercise: exercise.exercise,
              weight: exercise.weight,
              id: 1, // HACK
            },
          ]);
        }}
      >
        <Input
          value={exercise.exercise}
          onChange={onChange}
          label="Exercise"
          id="exercise"
          type="text"
        />
        <Input
          value={exercise.weight}
          onChange={onChange}
          id="weight"
          label="Weight"
          type="number"
        />
        <input type="submit" value="Save Exercise" />
      </form>
    </>
  );
}
