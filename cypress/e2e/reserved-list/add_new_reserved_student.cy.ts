beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Student List Component", () => {
  it("successfully submits form", () => {
    cy.visit("/reserved-students");
    cy.contains("button", "Add new").click();
    cy.get("#AddReserving_StudentId").type("SI240066");
    cy.get(".ant-input-search-button").eq(1).click();

    cy.get(".class-selection-container").should("be.visible");
    cy.get(".class-selection-container").eq(5).click();

    // Click to expand the dropdown
    cy.get("#AddReserving_ReservingReasonSelect").click({ force: true });

    // Wait for the dropdown options to be visible
    cy.get(".ant-select-dropdown").should("be.visible");

    // Click on the "Others" option
    cy.contains(".ant-select-item-option", "Others").click({ force: true });
    cy.get("#AddReserving_ReservingReasonTextArea").type("Other reason");

    // Check conditions with force: true
    cy.contains(
      "label",
      "Ensure the course has not progressed beyond 50%"
    ).click();
    cy.contains("label", "Determine retention fee payment").click();

    // Submit
    cy.contains("button", "Create").click();
    cy.get(".Toastify__toast--success").should("be.visible");
  });
});
