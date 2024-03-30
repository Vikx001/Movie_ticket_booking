import Chance from 'chance';
const chance = new Chance();

describe('Front End Test Suite', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8885/');
  });

  context('Test Case 1: Verify Login Actions', () => {
    it('Click Login and Click Cancel', () => {
      cy.get('button.MuiButton-root') 
      .contains('Log in') 
      .click();

      cy.get('button.MuiButton-root') 
      .contains('Cancel') 
      .click();
    });

    it('Click Login and with empty fields click Login Again', () => {
      cy.get('button.MuiButton-root') 
      .contains('Log in') 
      .click();

      cy.get('button.MuiButton-root') 
      .contains('Login') 
      .click();

      cy.get('.MuiSnackbarContent-message') 
      .should('contain', 'Login failed. Please try again.'); 
    });

    it('Click Login and with wrong fields click Login Again', () => {
      cy.get('button.MuiButton-root') 
      .contains('Log in') 
      .click();

      cy.get('input#email') 
      .type('test@gmail.com') 
      .should('have.value', 'test@gmail.com'); 

      cy.get('input#password') 
      .type('test123') 
      .should('have.value', 'test123'); 

      cy.get('button.MuiButton-root') 
      .contains('Login') 
      .click();

      cy.get('.MuiSnackbarContent-message') 
      .should('contain', 'Login failed. Please try again.'); 
    });

    it('Click Login and with correct fields click Login Again', () => {
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

      cy.get('.MuiSnackbarContent-message') 
      .should('contain', 'You are logged in!'); 
    });

    it('Validate the Logout ', () => {
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

      cy.get('.MuiSnackbarContent-message') 
      .should('contain', 'You are logged in!'); 

      cy.get('button.MuiButton-root') 
      .contains('Logout') 
      .click();

      cy.get(':nth-child(4) > .MuiPaper-root > .MuiSnackbarContent-message')
      .should('contain', 'You are logged out!'); 

      cy.get('.MuiSnackbarContent-action > .MuiButtonBase-root')
      .click();
    });


  });

  context('Test Case 2: Verify SignUp Actions', () => {
      it('Click SignUp and Click Cancel', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();

          cy.get('button.MuiButton-root') 
          .contains('Cancel') 
          .click();
          
      });

      it('Click SignUp and with empty fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();
  
          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup failed. Please try again.'); 
        });

        it('1-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 
  
          cy.get('input#password') 
          .type('n') 
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .clear() 
          .type('1')
          .should('have.value', '1'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.wait(1000);

          cy.focused().should('have.attr', 'id', 'email');

        });

        it('2-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n@')
          .should('have.value', 'n@'); 
  
          cy.get('input#password') 
          .type('n') 
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .clear() 
          .type('1')
          .should('have.value', '1'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.wait(1000);

          cy.focused().should('have.attr', 'id', 'email');

        });

        it('3-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n@g')
          .should('have.value', 'n@g'); 
  
          cy.get('input#password') 
          .type('n') 
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .clear() 
          .type('1')
          .should('have.value', '1'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup failed. Please try again.');

        });

        it('4-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n@g.')
          .should('have.value', 'n@g.'); 
  
          cy.get('input#password') 
          .type('n') 
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .clear() 
          .type('1')
          .should('have.value', '1'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.wait(1000);

          cy.focused().should('have.attr', 'id', 'email');

        });

        it('5-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n@g.c')
          .should('have.value', 'n@g.c'); 
  
          cy.get('input#password') 
          .type('n') 
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .clear() 
          .type('1')
          .should('have.value', '1'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup failed. Please try again.');

        });

        it('6-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n@g.com')
          .should('have.value', 'n@g.com'); 
  
          cy.get('input#password') 
          .clear()
          .should('have.value', '');

          cy.get('input#phone_no') 
          .clear() 
          .type('1')
          .should('have.value', '1'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup failed. Please try again.');

        });

        it('7-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n@g.com')
          .should('have.value', 'n@g.com'); 
  
          cy.get('input#password') 
          .type('n')
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .clear() 
          .should('have.value', ''); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.wait(2000);

          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup failed. Please try again.');

        });

        it('8-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('n')
          .should('have.value', 'n'); 

          cy.get('input#email') 
          .clear() 
          .type('n@g.com')
          .should('have.value', 'n@g.com'); 
  
          cy.get('input#password') 
          .type('n')
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .type('n')
          .should('have.value', 'n'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup failed. Please try again.');

        });

        it('9-Click SignUp and with wrong fields click SignUp Again', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();
  
          cy.get('input#full_name') 
          .clear() 
          .type('1')
          .should('have.value', '1'); 

          cy.get('input#email') 
          .clear() 
          .type('n@g.com')
          .should('have.value', 'n@g.com'); 
  
          cy.get('input#password') 
          .type('n')
          .should('have.value', 'n');

          cy.get('input#phone_no') 
          .type('1')
          .should('have.value', '1'); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup failed. Please try again.');

        });

        it('Validate Successful SignUp', () => {
          cy.get('button.MuiButton-root') 
          .contains('Sign up') 
          .click();

          const fullname = chance.name();
          const email = chance.email();
          
          const phoneNo = chance.phone();
  
          cy.get('input#full_name') 
          .clear() 
          .type(fullname)
          .should('have.value', fullname); 

          cy.get('input#email') 
          .clear() 
          .type(email)
          .should('have.value', email); 
  
          cy.get('input#password') 
          .type('abc123')
          .should('have.value', 'abc123');

          cy.get('input#phone_no') 
          .type(phoneNo)
          .should('have.value', phoneNo); 
  
          cy.get('button.MuiButton-root') 
          .contains('Sign Up') 
          .click();

          cy.get('.MuiSnackbarContent-message') 
          .should('contain', 'Signup successful!');

        });

  });

  context('Test Case 3: Validate the successful SignUp with a Login', () => {
      const email = chance.email();
    
      beforeEach(() => {
        
        cy.wrap(email).as('email');
      });

      it('Validate Successful SignUp', () => {
          const fullname = chance.name();
          const phoneNo = chance.phone();
          
        cy.get('button.MuiButton-root')
          .contains('Sign up')
          .click();
    
        cy.get('input#full_name')
          .clear()
          .type(fullname)
          .should('have.value', fullname);
    
        cy.get('input#email')
          .clear()
          .type(email)
          .should('have.value', email);
    
        cy.get('input#password')
          .type('abc123')
          .should('have.value', 'abc123');
    
        cy.get('input#phone_no')
          .type(phoneNo)
          .should('have.value', phoneNo);
    
        cy.get('button.MuiButton-root')
          .contains('Sign Up')
          .click();
    
        cy.get('.MuiSnackbarContent-message')
          .should('contain', 'Signup successful!');
      });
    
      it('Validate login', () => {
        cy.get('@email')
          .then((email) => {
            cy.get('button.MuiButton-root')
              .contains('Log in')
              .click();
    
            cy.get('input#email')
              .type(email)
              .should('have.value', email);
    
            cy.get('input#password')
              .type('abc123')
              .should('have.value', 'abc123');
    
            cy.get('button.MuiButton-root')
              .contains('Login')
              .click();
    
            cy.get('.MuiSnackbarContent-message')
              .should('contain', 'You are logged in!');
          });
      });
    });

  /*context('Test Case 4: Validate the Cart', () => {
      it('Validate hover Text', () => {
          cy.get('.sc-gLLuof')
          .trigger('mouseover');

          cy.get('.sc-kFCroH')
          .should('contain', 'Your cart is empty.');

          cy.get('.sc-irLvIq')
          .should('contain', 'Keep shopping');
      });
  });*/

  
});