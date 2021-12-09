/* eslint-disable jest/valid-title */
import { render, screen } from "@testing-library/react";
import { Input, inputType } from "./Input";

it("should apply specified label and associate the label with the input", () => {
  const label = "Test label";
  render(<Input id="test" label={label} type="text" value="" />);
  screen.getByLabelText(label);
});

describe("should render with each supported input type", () => {
  inputType.forEach((inputType) => {
    it(inputType, () => {
      const { container } = render(
        <Input id="test" label="Example" type={inputType} value="" />
      );
      expect(
        container.querySelector(`input[type="${inputType}"]`)
      ).toBeInTheDocument();
    });
  });
});

// Exercise 2: Write a test that confirms the value
// is set on the input when passed in.
it("should apply the provided value to the input", () => {
  const { container } = render(
    <Input id="test" label="" type="text" value="value" />
  );
  expect(container.querySelector(`input[value="value"]`)).toBeInTheDocument();
});
