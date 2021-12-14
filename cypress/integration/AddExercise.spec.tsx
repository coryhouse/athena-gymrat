describe("Add Exercise", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/add");
  });

  it("should validate onBlur", () => {
    // Initially, no validation errors should display
    cy.findByText("Please enter a name for the exercise.").should("not.exist");
    cy.findByText("Please enter a weight for the exercise.").should(
      "not.exist"
    );

    cy.findByLabelText("What exercise?").focus().blur();
    cy.findByLabelText("Weight").focus().blur();

    // Now, validation error messages should display
    cy.findByText("Please enter a name for the exercise.");
    cy.findByText("Please enter a weight for the exercise.");
  });

  it("should support adding and deleting an exercise", () => {
    // Should require all fields, so submit the form empty
    cy.findByRole("button", { name: "Save Exercise" }).click();

    // Now, validation error messages should display
    cy.findByText("Please enter a name for the exercise.");

    cy.findByLabelText("What exercise?").type("Hula Hoop");
    cy.findByLabelText("Weight").type("5");
    cy.findByRole("button", { name: "Save Exercise" }).click();

    cy.findByText("Exercise saved.");

    // Confirm saved data displays on home page.
    cy.findByText("Hula Hoop");
    cy.findByText("5");

    // Now that it's saved, let's test deletion
    cy.findByLabelText("Delete Hula Hoop with weight of 5")
      .click()
      .should("not.exist");

    cy.findByText("Exercise deleted.");
  });
});
