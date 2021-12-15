/// <reference types="cypress" />

describe("Exercises", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the 'no exercises' when there are no exercises", () => {
    // "Log in" as the user with no exercises via the dev tools
    cy.setUser("0-exercises@nope.com");
    cy.findByText("No exercises exist. :(");
  });
});
