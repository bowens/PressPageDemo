describe('PagePress Demo users page', () => {

    beforeEach(() => {
        const url = Cypress.env('HOST_URL') || 'http://localhost:8000';
        cy.visit(url + '/users');
    });

    it('Should have the correct page title', () => {
        cy.title().should('include', 'PressPage Demo - Users');
    });

    it('Should display ten users initially', () => {
        cy.get('div.pp-demo-UserCard').its('length').should('eq', 10);
    });

    it('Should display a Load More users button', () => {
        cy.get('button.pp-demo-LoadMoreUsers').its('length').should('eq', 1);
    });

    it('Should load more users when asked and display 20 in total', () => {
        cy.get('button.pp-demo-LoadMoreUsers').click();
        cy.wait(1500);
        cy.get('div.pp-demo-UserCard').its('length').should('eq', 20);
    });

    // GitHub responds with 30 users at a time and the application displays 10 users at a time. In order to trigger
    // a second XHR fetch we must attempt to view 40 users.
    it('Should load more users when asked and display up to 40 in total', () => {
        cy.get('button.pp-demo-LoadMoreUsers').click();
        cy.wait(200);
        cy.get('button.pp-demo-LoadMoreUsers').click();
        cy.wait(200);
        cy.get('button.pp-demo-LoadMoreUsers').click();
        cy.wait(1500);
        cy.get('div.pp-demo-UserCard').its('length').should('eq', 40);
    });

    it('Should have a delete button for users', () => {
        cy.get('div.pp-demo-UserCard')
            .first()
            .find('a.pp-demo-DeleteUserButton')
            .its('length')
            .should('eq', 1);
    });

    it('Should be able to remove users', () => {
        cy.get('div.pp-demo-UserCard').first().find('a.pp-demo-DeleteUserButton').click();
        cy.get('div.pp-demo-UserCard').its('length').should('eq', 9);
    });

    /**
     * @TODO This should be using fixtures rather than relying on actual data from api.github.com
     *
     * If this test begins to fail it could be simply that the mojombo user has been deleted.
     */
    it("Should display users' avatar correctly", () => {
        cy.get('div.pp-demo-UserCard')
            .first()
            .find('img')
            .should('have.attr', 'src', 'https://avatars.githubusercontent.com/u/1?v=4')
            .and('have.attr', 'alt', 'mojombo')
            .and('have.attr', 'title', 'mojombo');
    });

    /**
     * @TODO This should be using fixtures rather than relying on actual data from api.github.com
     *
     * If this test begins to fail it could be simply that the mojombo user has been deleted.
     */
    it("Should display users' username correctly", () => {
        cy.get('div.pp-demo-UserCard')
            .first()
            .find('div.pp-demo-UserName')
            .should('have.text', 'mojombo')
    });
});