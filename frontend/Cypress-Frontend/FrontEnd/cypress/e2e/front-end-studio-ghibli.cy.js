describe('Front End Test Suite', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8885/');
    });
  
    context('Test Case 1: Verify Studio Ghibli Header', () => {
      it('should display Studio Ghibli header correctly', () => {
        cy.get('h1.sc-eDLKkx.fqDSBD')
          .should('exist')
          .and('have.text', 'Studio Ghibli !!!');
      });
    });
  
    context('Test Case 2: Verify Input Interaction', () => {
      it('should interact with input elements properly', () => {
        cy.get('.MuiInputBase-input')
          .type('python')
          .should('have.value', 'python');
  
        cy.get('[placeholder="Search for anything"]')
          .clear()
          .type('NodeJs')
          .should('have.value', 'NodeJs');
      });
    });
  
    context('Test Case 3: Verify Studio Ghibli Div', () => {
      it('should display the Studio Ghibli div correctly', () => {
        cy.get('.MuiBox-root.css-zze9l3')
          .should('exist')
          .and('have.text', 'Studio Ghibli');
      });
    });
  
    context('Test Case 4: Verify Online Video Courses Description', () => {
      it('should display the online video courses description correctly', () => {
        cy.get('p.sc-cPtzlb.idtXMb')
          .contains('Choose from 183,000 online video courses with new additions published every month')
          .should('exist');
      });
    });
  
    context('Test Case 5: Verify Hidden Div', () => {
        it('should not display the hidden div after right-click', () => {
            cy.get('#root > div.sc-gUjWJS.gpDtLX > div:nth-child(1) > div > div > div.sc-bwzfXH.gwZiig > div')
                .each((div) => {
                    // Count h3 elements inside each div
                    cy.wrap(div).find('h3').its('length').then((count) => {
                        // Log the count
                        cy.log('Number of h3 elements inside the div:', count);
    
                        // Perform clicks based on the count minus 5
                        if (count > 5) {
                            const clickCount = count - 5;
                            for (let i = 0; i < clickCount; i++) {
                                cy.get('.sc-ifAKCX.eeaShJ.sc-EHOje.aoTUt')
                                    .find('svg')
                                    .first()
                                    .click();
                            }
                        }
                    });

                    cy.get('.sc-bdVaJa.imYUvI')
                    .first()
                    .children()
                    .should('have.length', 2);

                    cy.get('.sc-bdVaJa.imYUvI')
                    .eq(1)
                    .children()
                    .should('have.length', 2);
                });
        });
    });
    

  
    context('Test Case 6: When visiting the page', () => {
      it('should validate presence of Recently Added Courses heading', () => {
        cy.get('h2.sc-iLXxbI.huFomZ')
          .should('contain', 'Recently Added Courses');
      });
    });
  
    context('Test Case 7: Child Element Count Test', () => {
      it('verifies the number of child elements', () => {
        cy.get('#root > div.sc-gUjWJS.gpDtLX > div:nth-child(1) > div > div > div.sc-bwzfXH.gwZiig > div')
                .each((div) => {
                    // Count h3 elements inside each div
                    cy.wrap(div).find('h3').its('length').then((count) => {
                        expect(count).to.equal(19);
                        
                    });

                });
        });
    });
  
    context('Test Case 8: Verify Text', () => {
      it('verifies the presence of "Top Rated Courses"', () => {
        cy.get('h2.sc-iLXxbI.huFomZ')
          .contains('Tope Rated Courses') 
          .should('exist');
      });
    });
  
    context('Test Case 9: Verify Hidden Div 2', () => {
        it('should not display the hidden div after right-click', () => {
            cy.get('#root > div.sc-gUjWJS.gpDtLX > div:nth-child(2) > div > div > div.sc-bwzfXH.gwZiig > div')
                .each((div) => {
                    // Count h3 elements inside each div
                    cy.wrap(div).find('h3').its('length').then((count) => {
                        // Log the count
                        cy.log('Number of h3 elements inside the div:', count);
    
                        // Perform clicks based on the count minus 5
                        if (count > 5) {
                            const clickCount = count - 5;
                            for (let i = 0; i < clickCount; i++) {
                                cy.get('.sc-ifAKCX.eeaShJ.sc-EHOje.aoTUt')
                                    .find('svg')
                                    .eq(1)
                                    .click();
                            }
                        }
                    });

                    cy.get('.sc-bdVaJa.imYUvI')
                    .eq(1)
                    .children()
                    .should('have.length', 2);

                    cy.get('.sc-bdVaJa.imYUvI')
                    .first()
                    .children()
                    .should('have.length', 2);

                    
                });
        });
    });
  
    context('Test Case 10: Verify Text', () => {
      it('verifies the presence of "Top categories"', () => {
        cy.get('h2.sc-ejCKsa.dPOVHs')
          .contains('Top categories')
          .should('exist');
      });
    });
  
    context('Test Case 11: Validate Categories List', () => {
      it('Verifies the listed Categories', () => {
        const categoriesToVerify = [
          'Design',
          'Development',
          'Marketing',
          'IT and Software',
          'Personal Development',
          'Business',
          'Photography',
          'Music'
        ];
    
        cy.get('.sc-ldgOGP.gOkYRc').children().each(($child) => {
          const categoryName = $child.text().trim();
          expect(categoriesToVerify).to.include(categoryName);
        });
      });
    });
  
    context('Test Case 12: Validate Featured topics', () => {
      it('Validate Featured topics', () => {
        const featuredTopics = [
          'AWS Certification', 
          'Business', 
          'Cyber Security', 
          'Design', 
          'Development', 
          'Drawing', 
          'Ethical Hacking', 
          'Explore more topics', 
          'Financial Analysis', 
          'Graphic Design', 
          'IT and Software', 
          'Machine Learning', 
          'PMP', 
          'Photoshop', 
          'Python', 
          'SQL', 
          'Web Development'
        ];
    
        cy.get('.sc-bbxCgr.gFNSqw').find('h2, a').then(($children) => {
          const topicsFound = $children.map((index, element) => element.innerText.trim()).get();
          const allTopicsFound = featuredTopics.every(topic => topicsFound.includes(topic));
      
          expect(allTopicsFound).to.be.true;
        });
      });
    });
  
    context('Test Case 13: Validate footer elements', () => {
        it('Validate Topics', () => {
            const featuredTopics = [
                'Studio-Ghibli Business',
                'Teach on Studio-Ghibli',
                'Get the app',
                'About us',
                'Contact us',
                'Careers',
                'Blog',
                'Help and Support',
                'Affiliate',
                'Investors',
                'Terms',
                'Privacy policy',
                'Cookie settings',
                'Sitemap',
                'Accessibility statement'
              ];
            
            cy.get('.sc-bjUHJT.NQZOq')
                .find('ul.sc-yRUbj.gcmPvm')
                .each(($ul, index, $uls) => {
                    
                    cy.wrap($ul).find('li').each(($li, index, $lis) => {
                        
                        expect(featuredTopics).to.include($li.text().trim());
                    });
                });
        });
    });
    

  });