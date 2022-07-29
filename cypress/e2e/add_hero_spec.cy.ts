describe('Add Hero Test', () => {
  it('Adds a hero', () => {
    cy.visit('/heroes');
    // input name of new hero
    cy.get('#new-hero').type('James');
    // click button to add hero
    cy.get('button').contains('Add Hero').click();
    // check if list updated with new hero name
    cy.get('mat-list-item').contains('James').should('exist');
  });
});
