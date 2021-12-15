/// <reference types="cypress" />

describe("Exercises", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the loading message, then display the 'no exercises' message when there are no exercises", () => {
    cy.findByText("Loading...");
    // "Log in" as the user with no exercises via the dev tools
    cy.setUser("0-exercises@nope.com");
    cy.findByText("No exercises exist. :(");

    // Now the loading text should be hidden
    cy.findByText("Loading").should("not.exist");
  });
});
