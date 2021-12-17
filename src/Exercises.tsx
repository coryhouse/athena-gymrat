import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteExercise, getExercises } from "./api/exerciseApi";
import { Exercise } from "./types";
import { useUserContext } from "./UserContext";

export default function Exercises() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const exerciseQuery = useQuery<Exercise[]>(["exercises", user.id], () =>
    getExercises(user.id)
  );

  const exerciseDelete = useMutation(deleteExercise, {
    onSuccess: async (data, exerciseId) => {
      // Read existing exercises from query cache
      const existingExercises = queryClient.getQueryData([
        "exercises",
        user.id,
      ]) as Exercise[];

      // Remove the deleted exercise from cache
      queryClient.setQueryData(
        ["exercises", user.id],
        existingExercises.filter((e) => e.id !== exerciseId)
      );
    },
  });

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
                        exerciseDelete.mutate(exercise.id);
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
