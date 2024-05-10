beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Classes Management Component", () => {
  it("successfully submits form", () => {
    const classDetail = "HCM24_01";
    cy.visit(`/classes/${classDetail}`);
    cy.wait(5000);
    cy.get("#rc-tabs-0-tab-student_scores").click();
    cy.contains(".edit-container-list", "Score List").should("be.visible");
  });
});
