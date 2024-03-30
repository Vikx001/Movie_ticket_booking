describe('Front End Test Suite', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8886/');
  });

  context('Test Case 1:Verify "Sign In"', () => {
    it('Validate name "Sign In"', () => {
      cy.get('h2.block')
          .contains('Sign In')
          .should('exist');
    });

    it('Click "Sign In" with empty fields', () => {
      cy.get('button.bg-gray-900') 
      .contains('Sign In')
      .click();

      cy.get('p')
      .contains('Failed to log in. Please check your credentials.')
      .should('exist');
    });

    it('Click "Sign In" with incorrect fields', () => {

      cy.get('input[placeholder="name@mail.com"]')
      .type('Dorcas_Frami31hotmail.com');

      cy.get('input[type="password"][placeholder="********"]')
      .type('abc123');

      cy.get('button.bg-gray-900') 
      .contains('Sign In')
      .click();

      cy.get('p')
      .contains('Failed to log in. Please check your credentials.')
      .should('exist');

    });

    it('Test 2: Click "Sign In" with incorrect fields', () => {

      cy.get('input[placeholder="name@mail.com"]')
      .type('Dorcas_Frami31@hotmail.com');

      cy.get('input[type="password"][placeholder="********"]')
      .type('ab123');

      cy.get('button.bg-gray-900') 
      .contains('Sign In')
      .click();

      cy.get('p')
      .contains('Failed to log in. Please check your credentials.')
      .should('exist');

    });

    it('Click "Sign In" with correct fields', () => {

      cy.get('input[placeholder="name@mail.com"]')
      .type('Dorcas_Frami31@hotmail.com');

      cy.get('input[type="password"][placeholder="********"]')
      .type('abc123');

      cy.get('button.bg-gray-900') 
      .contains('Sign In')
      .click();

      cy.wait(1000);

      cy.visit('http://localhost:8886/');
      cy.wait(1000);

      cy.url().should('eq', 'http://localhost:8886/dashboard/home');

      cy.get('button.text-blue-gray-500')
      .contains('Logout')
      .should('exist');

    });
  });

  
});
