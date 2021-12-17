import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addExercise } from "./api/exerciseApi";
import { Input } from "./reusable/Input";
import { Exercise, FormStatus, NewExercise } from "./types";
import { useUserContext } from "./UserContext";

function getNewExercise(userId: number) {
  const newExercise: NewExercise = {
    type: "",
    weight: "",
    userId: userId,
  };
  return newExercise;
}

type Errors = Partial<NewExercise>;

export default function AddExercise() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [status, setStatus] = useState<FormStatus>("Idle");
  const [exercise, setExercise] = useState(getNewExercise(user.id));

  const exerciseMutation = useMutation(addExercise, {
    onSuccess: async (newExercise) => {
      // Read existing exercises from query cache
      const existingExercises = queryClient.getQueryData([
        "exercises",
        user.id,
      ]) as Exercise[];

      // Update query cache to include the new record. This way the record immediately displays after redirect
      queryClient.setQueryData(
        ["exercises", user.id],
        [...existingExercises, newExercise]
      );
    },
  });

  const navigate = useNavigate();

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
    if (!exercise.type) errors.type = "Please enter a name for the exercise.";
    if (!exercise.weight)
      errors.weight = "Please enter a weight for the exercise.";
    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Don't post back
    setStatus("Submitted");
    if (!formIsValid) return; // if form isn't valid, stop here.
    exerciseMutation.mutate(exercise);
    toast.success("Exercise saved.");
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Exercise</h1>
      <Input
        value={exercise.type}
        onChange={onChange}
        label="What exercise?"
        id="type"
        type="text"
        error={errors.type}
        formStatus={status}
      />
      <Input
        value={exercise.weight}
        onChange={onChange}
        id="weight"
        label="Weight"
        type="number"
        error={errors.weight}
        formStatus={status}
      />
      <input type="submit" value="Save Exercise" />
    </form>
  );
}
