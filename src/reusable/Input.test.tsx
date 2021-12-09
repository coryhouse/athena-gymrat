/* eslint-disable jest/valid-title */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, inputType } from "./Input";

it("should call the onChange handler", () => {
  const onChange = jest.fn();
  render(
    <Input
      onChange={onChange}
      id="test"
      label="Example label"
      type="text"
      value=""
    />
  );
  const input = screen.getByLabelText("Example label");
  userEvent.type(input, "Hi");
  expect(onChange).toHaveBeenCalledTimes(2);
});

it("should apply specified label and associate the label with the input", () => {
  const label = "Test label";
  render(
    <Input onChange={() => {}} id="test" label={label} type="text" value="" />
  );
  screen.getByLabelText(label);
});

describe("should render with each supported input type", () => {
  inputType.forEach((inputType) => {
    it(inputType, () => {
      const { container } = render(
        <Input
          onChange={() => {}}
          id="test"
          label="Example"
          type={inputType}
          value=""
        />
      );
      expect(
        container.querySelector(`input[type="${inputType}"]`)
      ).toBeInTheDocument();
    });
  });
});

it("should apply the provided value to the input", () => {
  const { container } = render(
    <Input onChange={() => {}} id="test" label="" type="text" value="value" />
  );
  expect(container.querySelector(`input[value="value"]`)).toBeInTheDocument();
});
