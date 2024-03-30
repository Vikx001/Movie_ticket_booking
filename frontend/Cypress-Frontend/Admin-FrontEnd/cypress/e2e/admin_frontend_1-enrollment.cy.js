describe('Front End Test Suite', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8886/');

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

        cy.contains('button', 'enrollments').click({force: true});

    });
  
    context('Verify DashBoard Home', () => {
      it('Validate name "Sign In"', () => {
        cy.get('h6.text-blue-gray-900')
            .contains('enrollments')
            .should('exist');
        
      });

      it('Validate the Enrollment Table', () => {
        cy.get('table tbody tr').eq(0).within(() => {
            cy.get('td').eq(0).should('contain', 'modi');
            cy.get('td').eq(1).should('contain', 'Terrance Brekke');
            cy.get('td').eq(2).should('contain', 'Jacklyn14@hotmail.com');
            cy.get('td').eq(3).should('contain', '787-216-5616');
            cy.get('td').eq(4).should('contain', 'card');
            cy.get('td').eq(5).should('contain', '2024-03-29T14:35:01.000Z');
          });
      
          
          cy.get('table tbody tr').eq(1).within(() => {
            cy.get('td').eq(0).should('contain', 'My new course');
            cy.get('td').eq(1).should('contain', 'Terrance Brekke');
            cy.get('td').eq(2).should('contain', 'Jacklyn14@hotmail.com');
            cy.get('td').eq(3).should('contain', '787-216-5616');
            cy.get('td').eq(4).should('contain', 'online');
            cy.get('td').eq(5).should('contain', '2024-03-29T14:33:08.000Z');
          });
      });

      
      
    });

    
  
    
  });
  