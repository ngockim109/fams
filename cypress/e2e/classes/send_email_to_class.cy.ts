beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Classes Management Component", () => {
  it("successfully submits form", () => {
    const classDetail = "HCM24_01";
    cy.visit(`/classes/${classDetail}`);
    cy.contains("button", "Send email").click();
    cy.get("#RemindForm_EmailType").click({ force: true });

    // Wait for the dropdown options to be visible
    cy.get(".ant-select-dropdown").should("be.visible");

    // Click on the "Others" option
    cy.contains(".ant-select-item-option", "Inform").click({ force: true });

    cy.get("#RemindForm_EmailTemplateId").click({ force: true });

    // Wait for the dropdown options to be visible
    cy.get(".ant-select-dropdown").should("be.visible");

    // Click on the "Others" option
    cy.contains(".ant-select-item-option", "Title Email Template").click({
      force: true,
    });

    // Preview email
    cy.contains("button", "Preview").click();
    cy.contains("button", "Back").click();
    cy.get(".btn-send-btn").click();

    cy.wait(5000); // Wait back-end response
    // Check for the success toast
    cy.get(".Toastify__toast--success").should("be.visible");
  });
});
