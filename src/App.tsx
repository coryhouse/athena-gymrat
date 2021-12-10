import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "./reusable/Input";

type NewExercise = {
  type: string;
  weight: string;
};

type Exercise = {
  id: number;
  exercise: string;
  weight: string;
};

const newExercise: NewExercise = {
  type: "",
  weight: "",
};

type Errors = {
  type?: string;
  weight?: string;
};

export function App() {
  const [exercise, setExercise] = useState(newExercise);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Derived state
  const errors = validate();
  const formIsValid = Object.keys(errors).length === 0;

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setExercise({
      ...exercise,
      [event.target.id]: event.target.value,
    });
  }

  function validate() {
    const errors: Errors = {};
    if (!exercise.type) errors.type = "Please enter a name for the exercise.";
    if (!exercise.weight)
      errors.weight = "Please enter a weight for the exercise.";
    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Don't post back
    setExercises([
      ...exercises,
      {
        exercise: exercise.type,
        weight: exercise.weight,
        id: 1, // HACK
      },
    ]);
    setExercise(newExercise);
  }

  return (
    <>
      <h1>Gymrat</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={exercise.type}
          onChange={onChange}
          label="What exercise?"
          id="type"
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

      {/* Exercise 3: Display the submitted exercises in a table */}
      <h2>Exercises</h2>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            // here's what I want to render for each element
            return (
              <tr key={exercise.exercise}>
                <td>{exercise.exercise}</td>
                <td>{exercise.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
