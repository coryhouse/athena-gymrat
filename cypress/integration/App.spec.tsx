it("should support adding an exercise", () => {
  cy.visit("http://localhost:3000");

  // Should require all fields, so submit the form empty
  cy.findByRole("button", { name: "Save Exercise" }).click();

  // Now, validation error messages should display
  cy.findByText("Please enter a name for the exercise.");

  cy.findByLabelText("What exercise?").type("Hula Hoop");
  cy.findByLabelText("Weight").type("5");
  cy.findByRole("button", { name: "Save Exercise" }).click();

  // Now the form should be empty since it was just submitted
  cy.findByLabelText("What exercise?").should("have.value", "");
  cy.findByText("Hula Hoop");
  cy.findByText("5");
});
