import Chance from 'chance';

const chance = new Chance();

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

        cy.contains('button', 'courses').click({force: true});

    });
  
    context('Verify DashBoard Home', () => {
      it('Validate name "Sign In"', () => {
        cy.get('h6.text-blue-gray-900')
            .contains('courses')
            .should('exist');
        
      });

      it('Validate Course Table Content', () => {
        cy.get('tbody tr:nth-child(1)').within(() => {
            cy.get('td:nth-child(1)').should('contain.text', 'Adobe Premiere Pro CC Masterclass: Video Editing in Premiere');
            cy.get('td:nth-child(2)').should('contain.text', '€105.00');
            cy.get('td:nth-child(3)').should('contain.text', '0Students');
            cy.get('td:nth-child(4)').should('contain.text', 'online');
            cy.get('td:nth-child(5)').should('contain.text', '2005-01-24T00:00:00.000Z');
        });
          
         
        cy.get('tbody tr:nth-child(2)').within(() => {
            cy.get('td:nth-child(1)').should('contain.text', 'Complete Graphics Design and Video Editing Masterclass');
            cy.get('td:nth-child(2)').should('contain.text', '€110.00');
            cy.get('td:nth-child(3)').should('contain.text', '0Students');
            cy.get('td:nth-child(4)').should('contain.text', 'online');
            cy.get('td:nth-child(5)').should('contain.text', '2026-01-24T00:00:00.000Z');
        });
      })

      it('Validate Add New Courses', () => {
        cy.get('button[type="button"]').contains('Add New').click();
        cy.get('h6.block.antialiased.tracking-normal.font-sans.text-base.font-semibold.leading-relaxed.text-white.flex-1')
        .should('have.text', 'Add Course');

        const courseTitle = chance.sentence({ words: 3 });
        const courseDescription = chance.paragraph();
        const learningOutcomes = chance.n(chance.sentence, 3).join('\n');
        const courseInclusions = chance.n(chance.sentence, 3).join('\n');
        const authorName = chance.name();
        const price = chance.integer({ min: 50, max: 200 });
        const courseContent = chance.paragraph();

        cy.get('input[name="title"]').type(courseTitle);
        cy.get('textarea[name="description"]').type(courseDescription);
        cy.get('textarea[name="learning_outcomes"]').type(learningOutcomes);
        cy.get('textarea[name="course_inclusions"]').type(courseInclusions);
        cy.get('input[name="author"]').type(authorName);
        cy.get('input[name="price"]').type(price);
        cy.get('input[name="course_content"]').type(courseContent);

        cy.get('button[type="submit"]').click();

        cy.visit('http://localhost:8886/');
        cy.wait(1000);

        cy.url().should('eq', 'http://localhost:8886/dashboard/home');

        cy.contains('button', 'courses').click({force: true});

        cy.get('table tbody tr:last-child').within(() => {
            cy.get('td:nth-child(1)').should('contain', courseTitle);
            cy.get('td:nth-child(2)').should('contain', `€${price}`);
            cy.get('td:nth-child(3)').should('contain', '0Students');
            cy.get('td:nth-child(4)').should('contain', 'online'); 
        });

        cy.visit('http://localhost:8885/');
        cy.wait(200);

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

        cy.get('#root > div.sc-gUjWJS.gpDtLX > div:nth-child(1) > div > div > div.sc-bwzfXH.gwZiig > div:first-child')
        .find('h3')
        .first()
        .invoke('text')
        .then((text) => {
            expect(text).to.include(courseTitle);
        });


    

      })

   /*   it('Validate Delete Courses', () => {
        cy.get('tr:last-of-type a:contains("Delete")')
        .click();

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Unable to perfoem delete !!');

            cy.on('window:confirm', () => true);
        });

      })*/

      it('Revert to List Courses from Add Course Page', () => {
        cy.get('button[type="button"]')
        .contains('Add New')
        .click();
        cy.get('h6.block.antialiased.tracking-normal.font-sans.text-base.font-semibold.leading-relaxed.text-white.flex-1')
        .should('have.text', 'Add Course');

        cy.get('button[type="button"]')
        .contains('List Courses')
        .click();

        cy.contains('h6', 'Courses Listing').should('be.visible');
      })
      
    });

    
  
    
  });
  