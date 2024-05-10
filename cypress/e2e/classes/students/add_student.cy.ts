beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Classes Management Component", () => {
  it("successfully submits form", () => {
    const classDetail = "HCM24_01";
    cy.visit(`/classes/${classDetail}`);

    cy.contains("button", "Add new").click();

    cy.get("#AddStudentClass_StudentId").type("SS240053");
    cy.get(".ant-input-search-button").eq(1).click();

    cy.contains("button", "Save").click();

    cy.wait(5000); // Wait back-end response
    // Check for the success toast
    cy.get(".Toastify__toast--success").should("be.visible");
  });
});
