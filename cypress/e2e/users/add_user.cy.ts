beforeEach(() => {
  cy.login("Admin12", "Admin@123");
});
describe("Student List Component", () => {
  it("successfully submits form", () => {
    cy.visit("/users");
    cy.contains("button", "Add User").click();

    cy.get("#AddUser_UserType").click();

    // Wait for the dropdown to appear
    cy.get(".ant-select-dropdown").should("be.visible");

    // Click on the option "Trainer"
    cy.contains(".ant-select-item-option", "Trainer").click();

    cy.get("#AddUser_FullName").type("Test User");
    cy.get("#AddUser_Username").type("test12");
    cy.get("#AddUser_Email").type("test12@gmail.com");
    cy.get("#AddUser_Address").type("Bắc Ninh");
    cy.get("#AddUser_Phone").type("0987654753");
    cy.get("#AddUser_Password").type("Test@12345");
    cy.get("#AddUser_DOB").type("01/02/2003");
    cy.contains("#AddUser_Gender label", "Female").click();
    // Check if the switch is initially checked
    cy.get(".ant-switch-inner").should(
      "not.have.class",
      "ant-switch-inner-checked"
    );

    cy.contains("button", "Create").click();
    cy.get(".Toastify__toast--success").should("be.visible");
  });
});
