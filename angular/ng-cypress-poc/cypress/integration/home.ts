describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial project page', () => {
    cy.contains('Testing Angular apps');
    cy.contains('Some useful sources:');
    cy.contains('Testing Angular - A guide to Robust Angular Applications');
    cy.contains('Mocking HTTP Calls in Cypress End-to-End Tests');
    cy.title().should('equal', 'Angular Cypress POC');
  });
});
