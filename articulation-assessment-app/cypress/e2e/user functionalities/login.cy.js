/// <reference types="cypress" />

context('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    }) 

    it('Open Login', () => {
        cy.get('.link').contains('Log in').click();
    });

  })

  describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.get('.link').contains('Log in').click();
      }) 
    
      it('Wrong credentials', () => {
        cy.get('input[placeholder="Email"]').type('john.doe@example.com');
        cy.get('input[placeholder="Password"]').type('wrongpassword');
    
        cy.intercept('POST', 'http://4.182.184.83/auth-api/api/auth/login', {
            statusCode: 401,
            body: { message: 'Invalid credentials' }
          }).as('loginRequest');
      
        cy.get('button').contains('Login').click();
    
        cy.get('#errorLogin').should('contain.text', 'Invalid credentials');
      });
        
      it('Input missing', () => {
        cy.get('button').contains('Login').click();
    
        cy.get('#errorLogin').should('contain.text', 'Please fill out all fields.');
      });
    
      it('Invalid email', () => {
        cy.get('input[placeholder="Email"]').type('invalid-email');
        cy.get('input[placeholder="Password"]').type('password123');
    
        cy.get('button').contains('Login').click();
    
        cy.get('#errorLogin').should('contain.text', 'Please enter a valid email.');
      });

      it('Succesful login', () => {
        cy.get('input[placeholder="Email"]').type('john.doe@example.com');
        cy.get('input[placeholder="Password"]').type('password123');
    
        cy.intercept('POST', 'http://4.182.184.83/auth-api/api/auth/login', {
            statusCode: 200,
            body: { token: 'mock-jwt-token' }
          }).as('loginRequest');
      

        cy.get('button').contains('Login').click();
        cy.login();

        cy.get('nav').contains('Profile');
        cy.get('nav').contains('Log out');
    
        cy.url().should('include', '/home');
      });
    });

    describe('Logout', () => {
        beforeEach(() => {
            cy.visit('http://localhost:5173/')
            cy.login();
          }) 
          it('log out', () => {
            cy.get('nav').contains('Log out').click();
        
            cy.get('nav').contains('Log in');
            cy.get('nav').should('not.contain', 'Profile');
          });
        });
  
  
  