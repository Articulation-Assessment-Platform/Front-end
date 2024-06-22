/// <reference types="cypress" />

  describe('Open profile', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.login();
      }) 

      it("Open profile", () => {
        cy.intercept('GET', 'http://http://4.182.195.93/users-api/api/SpeechTherapist/profile', (req) => {
          req.reply({
            statusCode: 200,
            body: {
                    "email": "maike@gmail.com",
                    "children": null,
                    "firstName": "Maike",
                    "lastName": "Meek"
                }
            
          });
        }).as('getUserData');
    
        cy.get('nav').contains('Profile').click();
    });
    
    });
  
  
  