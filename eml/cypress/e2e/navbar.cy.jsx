describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to the Explore screen', () => {
    cy.get('[data-testid=navBar]').contains('Explorar').click();
    cy.url().should('include', '/explore');
    cy.get('.text-xl.font-bold').should('have.text', 'Explorar cursos');
  });
});