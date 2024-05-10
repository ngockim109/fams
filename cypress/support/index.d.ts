/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to log in.
     * @example cy.login('username', 'password')
     */
    login(username: string, password: string): void;
  }
}
