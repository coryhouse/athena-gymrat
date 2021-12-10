import { ChangeEventHandler, FocusEventHandler, useState } from "react";
import { FormStatus } from "../types";

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

  /** Function called on input blur */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /** Status of the input's form */
  formStatus: FormStatus;
};

/** Reusable Input with Label */
export function Input(props: InputProps) {
  const [touched, setTouched] = useState(false);

  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <br />
        <input
          onBlur={(event) => {
            setTouched(true);
            if (props.onBlur) props.onBlur(event);
          }}
          onChange={props.onChange}
          type={props.type}
          id={props.id}
          value={props.value}
        />
      </div>
      {props.error && (props.formStatus === "Submitted" || touched) && (
        <p style={{ color: "red" }}>{props.error}</p>
      )}
    </>
  );
}
