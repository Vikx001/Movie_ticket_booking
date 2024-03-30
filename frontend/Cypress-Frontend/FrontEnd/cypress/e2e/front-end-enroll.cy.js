import Chance from 'chance';
const chance = new Chance();

describe('Front End Test Suite', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8885/');

    cy.get('button.MuiButton-root') 
    .contains('Log in') 
    .click();

    cy.get('input#email') 
    .type('Dorcas_Frami31@hotmail.com') 
    .should('have.value', 'Dorcas_Frami31@hotmail.com'); 

    cy.get('input#password') 
    .type('abc123') 
    .should('have.value', 'abc123'); 

    cy.get('button.MuiButton-root') 
    .contains('Login') 
    .click();

    cy.wait(1000);
    
  });

  
    it('TestCase 1: Click Enroll with Empty fields', () => {
        cy.get('#root > div.sc-gUjWJS.gpDtLX > div:nth-child(1) > div > div > div.sc-bwzfXH.gwZiig > div:first-child')
        .find('button')
        .eq(1) 
        .click();

        cy.get('button.MuiButton-containedPrimary') 
        .contains('Complete Payment') 
        .click(); 

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Something went wrong !! Your enrollment attempt was not successful!'); 
            cy.on('window:confirm', () => true);
        });
    });


    it('TestCase 2: Enroll Working after login', () => {
        cy.get('#root > div.sc-gUjWJS.gpDtLX > div:nth-child(1) > div > div > div.sc-bwzfXH.gwZiig > div:first-child')
        .find('button')
        .eq(1) 
        .click();
        
        const name = chance.name(); 
        const cardNumber = chance.cc({ type: 'Mastercard' }); 
        const expiryDate = chance.exp(); 
        const cvc = chance.integer({ min: 100, max: 999 }); 

        cy.get('input[name="name"]').type(name);
        cy.get('input[name="number"]').type(cardNumber);
        cy.get('input[name="expiry"]').type(expiryDate);
        cy.get('input[name="cvc"]').type(cvc);

        cy.get('button.MuiButton-containedPrimary') 
        .contains('Complete Payment') 
        .click(); 

        
        cy.get('div[style*="transform: translate(-50%, -50%)"]')
            .contains('Your payment has been successfully processed.')
            .should('exist');
     
          
    });

    it('Test Case 3: Check Enroll After Logout', () => {

        cy.get('button.MuiButton-root') 
        .contains('Logout') 
        .click();

        cy.get('#root > div.sc-gUjWJS.gpDtLX > div:nth-child(1) > div > div > div.sc-bwzfXH.gwZiig > div:first-child')
        .find('button')
        .eq(1) 
        .click();
        
        const name = chance.name(); 
        const cardNumber = chance.cc({ type: 'Mastercard' }); 
        const expiryDate = chance.exp(); 
        const cvc = chance.integer({ min: 100, max: 999 }); 

        cy.get('input[name="name"]').type(name);
        cy.get('input[name="number"]').type(cardNumber);
        cy.get('input[name="expiry"]').type(expiryDate);
        cy.get('input[name="cvc"]').type(cvc);

        cy.get('button.MuiButton-containedPrimary') 
        .contains('Complete Payment') 
        .click(); 

        
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Something went wrong !! Your enrollment attempt was not successful!'); 
            cy.on('window:confirm', () => true);
        });
    });
    

});