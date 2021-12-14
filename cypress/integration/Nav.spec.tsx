// Exercise 3: Test the Nav
describe("Nav", () => {
  it("should navigate to each page", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("link", { name: "Add Exercise" }).click();
    cy.url().should("equal", "http://localhost:3000/add");

    // Now nav back to the home page
    cy.findByRole("link", { name: "Home" }).click();
    cy.url().should("equal", "http://localhost:3000/");
  });
});
