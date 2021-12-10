import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "./reusable/Input";

type NewExercise = {
  type: string;
  weight: string;
};

type Exercise = NewExercise & {
  id: number;
};

const newExercise: NewExercise = {
  type: "",
  weight: "",
};

type Errors = Partial<NewExercise>;

type Touched = {
  type?: boolean;
  weight?: boolean;
};

type Status = "Idle" | "Submitted";

export function App() {
  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<Status>("Idle");
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
    // Since form hasn't been submitted yet, don't bother validating.
    if (!exercise.type && (status === "Submitted" || touched.type))
      errors.type = "Please enter a name for the exercise.";
    if (!exercise.weight && (status === "Submitted" || touched.weight))
      errors.weight = "Please enter a weight for the exercise.";
    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Don't post back
    setStatus("Submitted");
    if (!formIsValid) return; // if form isn't valid, stop here.
    setExercises([
      ...exercises,
      {
        type: exercise.type,
        weight: exercise.weight,
        id: 1, // HACK
      },
    ]);
    setExercise(newExercise);
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    setTouched({ ...touched, [event.target.id]: true });
  }

  return (
    <>
      <h1>Gymrat</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={exercise.type}
          onChange={onChange}
          onBlur={onBlur}
          label="What exercise?"
          id="type"
          type="text"
          error={errors.type}
        />
        <Input
          value={exercise.weight}
          onChange={onChange}
          onBlur={onBlur}
          id="weight"
          label="Weight"
          type="number"
          error={errors.weight}
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
              <tr key={exercise.id}>
                <td>{exercise.type}</td>
                <td>{exercise.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
