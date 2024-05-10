beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Add Email Component", () => {
  it("successfully submits form", () => {
    cy.visit("/emails");

    // Fill in form inputs
    cy.contains("button", "Add new").click();
    cy.get("#AddEmail_Name").type("Title Email Template");
    cy.get("#AddEmail_Description").type("Description Email Template");
    cy.get("#AddEmail_Type").click();

    cy.get(".ant-select-dropdown").should("be.visible");

    // Click on the option "Inform"
    cy.contains(".ant-select-item-option", "Inform").click();

    cy.get("#AddEmail_ApplyTo").click();

    cy.get(".ant-select-dropdown").should("be.visible");
    cy.contains(".ant-select-item-option", "Student").click();

    // Check if the switch is initially unchecked
    cy.get(".ant-switch-inner").should(
      "not.have.class",
      "ant-switch-inner-checked"
    );

    // Click on the switch to toggle its state
    cy.get(".ant-switch-inner").click();
    cy.get("#AddEmail_Subject").type("Subject Email Template");
    cy.get(".ql-editor").type("Content Email Template");

    cy.contains("button", "Upload").click();
    cy.get(".Toastify__toast--success").should("be.visible");
  });
});
