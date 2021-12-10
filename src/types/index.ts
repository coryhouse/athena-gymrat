export type FormStatus = "Idle" | "Submitted";

export type NewExercise = {
  type: string;
  weight: string;
};

export type Exercise = NewExercise & {
  id: number;
};
