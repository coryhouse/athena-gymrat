/* eslint-disable jest/valid-title */
import { render, screen } from "@testing-library/react";
import { Input, inputType } from "./Input";

it("should apply specified label and associate the label with the input", () => {
  const label = "Test label";
  render(<Input id="test" label={label} type="text" />);
  screen.getByLabelText(label);
});

describe("should render with each supported input type", () => {
  inputType.forEach((inputType) => {
    it(inputType, () => {
      const { container } = render(
        <Input id="test" label="Example" type={inputType} />
      );
      expect(
        container.querySelector(`input[type="${inputType}"]`)
      ).toBeInTheDocument();
    });
  });
});
