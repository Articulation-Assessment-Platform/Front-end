/// <reference types="cypress" />

describe('Delete account', () => {
    beforeEach(() => {
      // Visit the homepage and login (Assuming cy.login() handles login)
      cy.visit('http://localhost:5173/');
      cy.login(); // Assuming this logs in the user
      
        cy.intercept('GET', 'http://4.182.195.93/users-api/api/SpeechTherapist/profile', (req) => {
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
      // Intercept the delete request
      cy.intercept('DELETE', 'http://4.182.195.93/users-api/api/SpeechTherapist/remove', (req) => {
        req.reply({
          statusCode: 200               
        });
      }).as('deleteUserData');
      
      // Navigate to the profile page
      cy.get('nav').contains('Profile').click();
    });
  
    it("Delete account - Confirm clicked", () => {
      cy.get('.delete-btn').click();
      cy.clearTokenCookie();

      cy.get('.confirm-btn').click();
  
      cy.wait('@deleteUserData').then(() => {
        
        cy.url().should('eq', 'http://localhost:5173/home');
        cy.get('nav').should('not.contain', 'Profile');
        cy.get('nav').should('not.contain', 'Logout');
      });
    });
  });

  describe('Delete account cancel', () => {
    beforeEach(() => {
      // Visit the homepage and login (Assuming cy.login() handles login)
      cy.visit('http://localhost:5173/');
      cy.login(); // Assuming this logs in the user
      
      cy.intercept('GET', 'http://4.182.195.93/users-api/api/SpeechTherapist/profile', (req) => {
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
  
    it("Delete account - Confirm clicked", () => {
      cy.get('.delete-btn').click();

      cy.get('.cancel-btn').click();
  
        
        cy.url().should('eq', 'http://localhost:5173/profile');
        cy.get('nav').contains('Profile');
        cy.get('nav').contains('Profile');
    });
  });
  