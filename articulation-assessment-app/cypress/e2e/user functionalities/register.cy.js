/// <reference types="cypress" />

context('Register', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })
  
    it('Register', () => {
   
        cy.get('.link').contains('Log in').click();
        cy.contains('Sign up').click();
        cy.location('pathname').should('include', 'register')
    })
  
    

  })

  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/register');
    });
  
    it('should display error messages for invalid inputs', () => {
      // Click Register without filling the form
      cy.get('button.registerButton').click();
      cy.get('.error').should('contain', 'Please fill in your information');
  
      // Fill in invalid email
      cy.get('input#email').type('invalid-email');
      cy.get('input#password').type('weak');
      cy.get('input#passwordAgain').type('notmatching');
      cy.get('input#firstName').type('Maike');
      cy.get('input#lastName').type('Meek');
      cy.get('button.registerButton').click();
      cy.get('.error').should('contain', 'Invalid email format');
  
      // Fill in valid email but invalid passwords
      cy.get('input#email').clear().type('maike@gmail.com');
      cy.get('input#password').type('weak');
      cy.get('input#passwordAgain').type('notmatching');
      cy.get('button.registerButton').click();
      cy.get('.error').should('contain', 'Password does not meet the criteria');
      });
  
    it('should redirect to homepage after successful registration', () => {
      // Fill in valid registration data
      cy.get('input#email').type('Maike@example.com');
      cy.get('input#firstName').type('Maike');
      cy.get('input#lastName').type('Meek');
      cy.get('input#password').clear().type('StrongP@ssw0rd');
      cy.get('input#passwordAgain').clear().type('StrongP@ssw0rd');
      cy.intercept('POST', 'http://4.182.184.83/users-api/api/SpeechTherapist/add', {
        statusCode: 200,
        body: { success: true }
      }).as('registerUser');
      cy.get('button.registerButton').click();
  
      // Verify redirection to homepage
      cy.get('p').should('contain', 'You have registered successfully');
    });
  });
  
  
  