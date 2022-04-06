describe('RandomDogListComponent', () => {
  beforeEach(() => {
    cy.visit('/dogs');
  });

  it('Visiting dog random list and when click button bring new images', () => {
    cy.byTestId('dog-0').should('exist');
    cy.byTestId('dog-11').should('exist');

    cy.byTestId('random-dogs-button').click();

    cy.byTestId('dog-0').should('exist');
    cy.byTestId('dog-11').should('exist');
  });
});
