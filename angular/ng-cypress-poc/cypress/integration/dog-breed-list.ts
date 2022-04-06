describe('DogBreedListComponent', () => {
  beforeEach(() => {
    cy.visit('/dogs/breeds');
  });

  it('Visiting dog breed list and all the breeds need to be listed, when click on item should load one image', () => {
    cy.byTestId('akita').should('have.text', ' akita ');

    cy.byTestId('akita').click();

    cy.get('img').should('exist');
  });

  it('Visiting dog breed list when not click on a breed, any image should be loaded', () => {
    cy.byTestId('akita').should('have.text', ' akita ');

    cy.get('img').should('not.exist');
  });
});
