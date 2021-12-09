export const inputType = ["text", "number", "email"] as const;
type InputType = typeof inputType[number]; // This creates a union type

type InputProps = {
  /** Input label */
  label: string;

  /** Input type */
  type: InputType;

  /** Input ID */
  id: string;

  /** Input value */
  value: string;
};

/** Reusable Input with Label */
export function Input(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input type={props.type} id={props.id} value={props.value} />
    </div>
  );
}
