/// <reference types="cypress" />

  describe('Open profile', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.login();
      }) 

      it("Open profile", () => {
        cy.intercept('POST', 'http://4.182.184.83/users-api/api/SpeechTherapist/profile', (req) => {
          req.reply({
            statusCode: 200,
            body: { success: true, data: { firstName: 'Maike', lastName: "Meek", email: "maike@gmail.com" } }
          });
        }).as('getUserData');
    
        cy.get('nav').contains('Profile').click();
    
        cy.get('.profile-item').contains('First Name:').should('have.text', 'First Name: Maike');
        cy.get('.profile-item').contains('Last Name:').should('have.text', 'Last Name: Meek');
        cy.get('.profile-item').contains('Email:').should('have.text', 'Email: maike@gmail.com');
      });
    
     
    });
  
  
  