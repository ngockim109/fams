beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Classes Management Component", () => {
  it("successfully submits form", () => {
    cy.visit("/classes");

    const rowKey = "HCM24_01";

    // Click the button within the specified row
    cy.get(`tr[data-row-key="${rowKey}"]`) // Locate the row
      .find("button.ant-btn") // Find the button within the row
      .click();

    cy.get(".ant-dropdown-menu").find("a").click();
    cy.url().should("include", `/classes/${rowKey}`);
  });
});
