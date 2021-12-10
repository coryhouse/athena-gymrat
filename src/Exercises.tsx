import { Exercise } from "./types";

type ExerciseProps = {
  exercises: Exercise[];
};

export function Exercises({ exercises }: ExerciseProps) {
  return (
    <>
      <h1>Gymrat</h1>

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
