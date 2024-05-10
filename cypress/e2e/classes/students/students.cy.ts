beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Classes Management Component", () => {
  it("successfully submits form", () => {
    const classDetail = "HCM24_01";
    cy.visit(`/classes/${classDetail}`);
    cy.get("#rc-tabs-0-tab-student_class").click();
    cy.contains(".edit-container-list", "Student Class List").should(
      "be.visible"
    );
  });
});
