describe('PagePress Demo users page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8000/');
    });

    it('Should have the correct page title', () => {
        cy.title().should('include', 'PressPage Demo - Home');
    });

    it('Should display the logo image', () => {
        cy.get('img#homepage-logo').its('length').should('eq', 1);
    });

    it('Should have the correct alt & title attributes on the logo image', () => {
        cy.get('img#homepage-logo')
            .should('have.attr', 'src', '/logo.jpg')
            .and('have.attr', 'alt', 'Demo Logo')
            .and('have.attr', 'title', 'Demo Logo');
    });

    it('Should link to /users', () => {
        cy.get('a#homepage-link-to-users')
            .should('have.attr', 'href', '/users');
    });

});