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

    });
  
    context('Verify DashBoard Home', () => {
      it('Validate name "Sign In"', () => {
        cy.get('h6.text-blue-gray-900')
            .contains('home')
            .should('exist');
        
      });

      it('Should check all dashboard elements', () => {
    
        cy.get('.m-4 ul.flex li').each(($li, index) => {
          const expectedTexts = ['dashboard', 'customers', 'courses', 'enrollments'];
          const expectedLinks = ['/dashboard/home', '/dashboard/customers', '/dashboard/courses', '/dashboard/enrollments'];
    
          cy.wrap($li)
            .find('a')
            .should('have.attr', 'href', expectedLinks[index])
            .find('p')
            .should('have.text', expectedTexts[index]);
        });
        
      });

      it('Should check all dashboard Home elements and Logout', () => {
    
        cy.get('.mb-12 .relative.flex.flex-col').each(($element, index) => {
          const titles = ['Today\'s Money', 'Today\'s Users', 'New Clients', 'Sales'];
          const amounts = ['$53k', '2,300', '3,462', '$103,430'];
          const percentages = ['+55%', '+3%', '-2%', '+5%'];
    
          cy.wrap($element)
            .find('.p-4.text-right p')
            .eq(0)
            .should('have.text', titles[index]);
    
          cy.wrap($element)
            .find('.p-4.text-right h4')
            .eq(0)
            .should('have.text', amounts[index]);
    
            cy.wrap($element)
            .find('.border-t.border-blue-gray-50 p')
            .eq(0)
            .should('include.text',percentages[index]);
            
        });

        cy.get('button.relative.align-middle')
        .eq(1)
        .click();

        cy.wait(2000);
        cy.visit('http://localhost:8886/');

      });

      
    });
  
    
  });
  