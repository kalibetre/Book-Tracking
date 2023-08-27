describe("New book input form", () => {
    it("adds a new book", () => {
        cy.server();
        cy.route('GET', 'http://localhost:8080/api/v1/books', {
            data: [
                {
                    title: 'Test Book Title',
                    category: 'completed',
                    id: '4baccff1-8c05-4445-8384-85dce30e85d9'
                }
            ]
        }).as('getBooks');

        cy.route('POST', 'http://localhost:8080/api/v1/books', {
            data: [
                {
                    title: 'Test Book Title',
                    category: 'completed',
                    id: '4baccff1-8c05-4445-8384-85dce30e85d9'
                }
            ]
        }).as('addBooks');

        cy.visit('/');
        cy.wait('@getBooks');
        
        // Mock the book title for testing
        const mockBookTitle = 'Test Book Title';

        // Find the input field for the book title and type the mock title
        cy.get('[role="book title input"]').type(mockBookTitle);

        // Find and click the "Add" button
        cy.get('#add-book-button').click();
        cy.wait('@addBooks')

        // Verify that the new book was added
        cy.contains('[role="book-title"]', `${mockBookTitle}-XXX`).should('be.visible');
    })
})
