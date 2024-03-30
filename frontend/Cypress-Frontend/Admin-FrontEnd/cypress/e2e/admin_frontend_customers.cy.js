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

        cy.contains('button', 'customers').click({force: true});

    });
  
    context('Verify DashBoard Home', () => {
      it('Validate name "Sign In"', () => {
        cy.get('h6.text-blue-gray-900')
            .contains('customers')
            .should('exist');
        
      });
      
    });

    context('Validate the Customer table', () => {
        it('Validate Customer Values', () => {
            cy.get('tbody tr:nth-child(1)') 
            .within(() => { 
                cy.get('td:nth-child(1)').should('contain.text', 'Hubert L Forrester'); 
                cy.get('td:nth-child(2)').should('contain.text', 'HubertLForrester@teleworm.us'); 
                cy.get('td:nth-child(5)').should('contain.text', 'Active');
            });
            cy.get('tbody tr:nth-child(3)') 
            .within(() => { 
                cy.get('td:nth-child(1)').should('contain.text', 'Thomas S. Cobb'); 
                cy.get('td:nth-child(2)').should('contain.text', 'AndrewCArrington@dayrep.com'); 
                cy.get('td:nth-child(5)').should('contain.text', 'Active');
            });
        });

        it('Validating the Delete Functionality', () => {
            cy.get('#root > div > div > div.mt-12.mb-8.flex.flex-col.gap-12 > div > div.p-6.overflow-x-scroll.px-0.pt-0.pb-2 > table')
                .find('tbody tr')
                .last()
                .within(() => {
                    cy.get('td:last-child')
                        .find('a')
                        .contains('Delete')
                        .click();
                });
        
            cy.on('window:alert', (message) => {
                expect(message).to.equal('Are you sure?'); 
                cy.on('window:confirm', () => true);
            });
        });
        
    });
  
    
  });
  