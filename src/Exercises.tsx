import { deleteExercise } from "./api/exerciseApi";
import { Exercise } from "./types";

// Exercise 2: Remove the exercise from state after the delete completes.
// This way, the UI will reflect the deletion.

type ExerciseProps = {
  exercises: Exercise[];
};

export function Exercises({ exercises }: ExerciseProps) {
  function renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Exercise</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <tr key={exercise.id}>
                <td>
                  <button onClick={(e) => deleteExercise(exercise.id)}>
                    Delete
                  </button>
                </td>
                <td>{exercise.type}</td>
                <td>{exercise.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <h1>Gymrat</h1>

      <h2>Exercises</h2>
      {exercises.length > 0 ? renderTable() : <p>No exercises exist. :(</p>}
    </>
  );
}
