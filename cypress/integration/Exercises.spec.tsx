describe("Exercises", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // TODO: Determine how to show this message in a repeatable manner
  it.skip("should display exercises, then support deleting exercises and display the no exercises message when there are no exercises", () => {
    // Now I've deleted all existing exercises, so the no exercies message should display
    cy.findByText("No exercises exist. :(");
  });
});
