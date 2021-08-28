describe('Home', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders without errors', () => {
        cy.findAllByRole('button', {
            timeout : 10000,
        }).should('have.length', 3);
    });
});
