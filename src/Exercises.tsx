import { useState } from "react";
import { toast } from "react-toastify";
import { deleteExercise } from "./api/exerciseApi";
import { Exercise } from "./types";

type ExerciseProps = {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
};

export function Exercises({ exercises, setExercises }: ExerciseProps) {
  const [error, setError] = useState<unknown>(null);

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
                  <button
                    aria-label={`Delete ${exercise.type} with weight of ${exercise.weight}`}
                    onClick={async (e) => {
                      try {
                        // This is an optimistic delete.
                        // We're not waiting for the delete call above to succeed.
                        setExercises(
                          exercises.filter((e) => e.id !== exercise.id)
                        );
                        await deleteExercise(exercise.id);
                        toast.success("Exercise deleted.");
                      } catch (error) {
                        setError(error);
                      }
                    }}
                  >
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

  if (error) throw error;

  return (
    <>
      <h1>Gymrat</h1>

      <h2>Exercises</h2>
      {exercises.length > 0 ? renderTable() : <p>No exercises exist. :(</p>}
    </>
  );
}
