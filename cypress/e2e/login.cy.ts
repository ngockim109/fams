beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Login Component", () => {
  it("successfully submits form after authentication", () => {
    cy.visit("/");
    cy.get("#userNameAvatar").click();
    cy.contains("button", "Profile").should("be.visible");
    cy.contains("button", "Log out").should("be.visible");
  });
});
