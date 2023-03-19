"use strict";

const { SWITCH } =require('./antd-class-name')

Cypress.Commands.add('Toggle switch', (id) => {
  cy.get(`#${id}`).click();
});

Cypress.Commands.add("Verify switch's value", (id, value) => {
  cy.get(`#${id}`)
    .should('have.class', SWITCH)
    .should('have.attr', 'role', 'switch')
    .should('have.attr', 'aria-checked', value.toString());
});
