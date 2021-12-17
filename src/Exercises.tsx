import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { deleteExercise, getExercises } from "./api/exerciseApi";
import { Exercise } from "./types";
import { useUserContext } from "./UserContext";

export function Exercises() {
  const { user } = useUserContext();
  const exerciseQuery = useQuery<Exercise[]>(["exercises", user.id], () =>
    getExercises(user.id)
  );
  const [error, setError] = useState<unknown>(null);

  function renderTable(exercises: Exercise[]) {
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
                        // setExercises(
                        //   exercises.filter((e) => e.id !== exercise.id)
                        // );
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

  if (exerciseQuery.isLoading || !exerciseQuery.data) return <p>Loading...</p>;

  if (error) throw error;

  return (
    <>
      <h1>Gymrat</h1>

      <h2>Exercises</h2>

      {/** If react-query is refetching to check for fresh data, show the user a message */}
      {exerciseQuery.isRefetching && (
        <p
          style={{
            backgroundColor: "lightblue",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          Checking for fresh data...
        </p>
      )}

      {exerciseQuery.data.length > 0 ? (
        renderTable(exerciseQuery.data)
      ) : (
        <p>No exercises exist. :(</p>
      )}
    </>
  );
}
