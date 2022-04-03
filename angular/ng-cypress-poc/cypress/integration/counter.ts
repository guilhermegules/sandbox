describe('Counter', () => {
  beforeEach(() => {
    cy.visit('/counter');
  });

  it('Visiting counter page and adding values', () => {
    cy.byTestId('count').should('have.text', 'Counter: 0');

    cy.byTestId('increment-button').click();

    cy.byTestId('count').should('have.text', 'Counter: 1');
  });

  it('Visiting counter page and subtract values', () => {
    cy.byTestId('increment-button').click();
    cy.byTestId('increment-button').click();

    cy.byTestId('decrement-button').click();

    cy.byTestId('count').should('have.text', 'Counter: 1');
  });

  it('Visiting counter page adding and resetting values', () => {
    cy.byTestId('increment-button').click();
    cy.byTestId('increment-button').click();

    cy.byTestId('reset-button').click();

    cy.byTestId('count').should('have.text', 'Counter: 0');
  });
});
