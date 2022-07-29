describe('add race spec', () => {
  it('adds a race', () => {
    cy.visit('/heroes');

    cy.get('#new-hero').type('Martian man eater');

    cy.get('mat-select').click();

    cy.get('mat-option').contains('Martian').click();

    cy.get('button').contains('Add Hero').click();

    cy.get('mat-list-item').contains('Martian Man Eater').should('exist');

    cy.get('mat-list-item')
      .contains('Martian Man Eater')
      .within((hero) => {
        cy.get('#race').should('have.text', 'Race: Martian');
      });
  });
});
