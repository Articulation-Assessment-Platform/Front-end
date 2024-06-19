// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (role = 'SpeechTherapist') => {
    const token = generateFakeJwt(role);
    cy.setCookie('token', token);
  });
  
  function generateFakeJwt(role) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    const payload = {
      sub: '1234567890',
      name: 'John Doe',
      role: role,
      iat: Math.floor(Date.now() / 1000) - 30,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour expiration
    };
  
    const base64Header = btoa(JSON.stringify(header)).replace(/=/g, '');
    const base64Payload = btoa(JSON.stringify(payload)).replace(/=/g, '');
    const signature = 'fake-signature'; // You can use a real signing mechanism if needed
  
    return `${base64Header}.${base64Payload}.${signature}`;
  }