/// <reference types="cypress" />

context('Navigation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })
  
    it('Go automatically to home', () => {
   
      cy.location('pathname').should('include', 'home')
    })
  
    it('cy.reload() - reload the page', () => {
      cy.reload()
  
      cy.reload(true)
    })
  
    it('cy.visit() - visit a remote url', () => {

      cy.visit('http://localhost:5173/register', {
        timeout: 50000, 
        onBeforeLoad (contentWindow) {
          expect(typeof contentWindow === 'object').to.be.true
        },
        onLoad (contentWindow) {
          expect(typeof contentWindow === 'object').to.be.true
        },
      })
    })

    it('cy.visit() - go back to home page', () => {

        cy.visit('http://localhost:5173/home')
        cy.location('pathname').should('include', 'home')
      })
  })
  