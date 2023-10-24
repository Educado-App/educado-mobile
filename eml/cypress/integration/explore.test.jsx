describe('Explore component', () => {
  beforeEach(() => {
    cy.visit('/explore');
  });

  it('displays the correct title', () => {
    cy.get('.text-xl.font-bold').should('have.text', 'Explorar cursos');
  });

  it('filters courses based on search text', () => {
    cy.get('input[type="search"]').type('JavaScript');
    cy.get('.explore-card').should('have.length', 1);
  });

  it('filters courses based on selected category', () => {
    cy.get('.filter-nav-bar__category').contains('React').click();
    cy.get('.explore-card').should('have.length', 2);
  });

  it('displays the correct number of courses', () => {
    cy.get('.explore-card').should('have.length', 3);
  });

  it('refreshes the course list when the refresh control is triggered', () => {
    cy.get('.explore-card').should('have.length', 3);
    cy.get('.scroll-view').scrollTo('bottom');
    cy.get('.scroll-view').scrollTo('top');
    cy.get('.refresh-control').scrollIntoView().click();
    cy.get('.explore-card').should('have.length', 3);
  });
});