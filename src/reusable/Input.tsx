import { ChangeEventHandler } from "react";

export const inputType = ["text", "number", "email"] as const;
type InputType = typeof inputType[number]; // This creates a union type

type InputProps = {
  /** Validation error to display below the input */
  error: string | undefined;

  /** Input label */
  label: string;

  /** Input type */
  type: InputType;

  /** Input ID */
  id: string;

  /** Input value */
  value: string;

  /** Function called on input change */
  onChange: ChangeEventHandler<HTMLInputElement>;
};

/** Reusable Input with Label */
export function Input(props: InputProps) {
  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <br />
        <input
          onChange={props.onChange}
          type={props.type}
          id={props.id}
          value={props.value}
        />
      </div>
      {props.error && <p style={{ color: "red" }}>{props.error}</p>}
    </>
  );
}
