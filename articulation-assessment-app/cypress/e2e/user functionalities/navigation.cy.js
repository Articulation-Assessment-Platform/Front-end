/// <reference types="cypress" />

context('Navigation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })
  
    it('Go automatically to home', () => {
   
      cy.location('pathname').should('include', 'home')
    })
  
    it('cy.reload() - reload the page', () => {
      // https://on.cypress.io/reload
      cy.reload()
  
      // reload the page without using the cache
      cy.reload(true)
    })
  
    it('cy.visit() - visit a remote url', () => {
      // https://on.cypress.io/visit
  
      // Visit any sub-domain of your current domain
      // Pass options to the visit
      cy.visit('http://localhost:5173/register', {
        timeout: 50000, // increase total time for the visit to resolve
        onBeforeLoad (contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === 'object').to.be.true
        },
        onLoad (contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === 'object').to.be.true
        },
      })
    })

    it('cy.visit() - go back to home page', () => {

        cy.visit('http://localhost:5173/home')
        cy.location('pathname').should('include', 'home')
      })
  })
  