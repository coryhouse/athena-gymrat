type InputProps = {
  label: string;
  type: "text" | "number" | "email";
  id: string;
};

export function Input(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input type={props.type} id={props.id} />
    </div>
  );
}
