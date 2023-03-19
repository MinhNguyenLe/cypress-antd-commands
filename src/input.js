'use strict'

const { INPUT, INPUT_NUMBER } = require('./antd-class-name')

Cypress.Commands.add("Verify input's value", ({ id, value, rules }) => {
  cy.get(`#${id}`)
    .should('have.class', INPUT)
    .should('have.attr', 'type', 'text')
    .should('have.value', value);

  if (rules.require) {
    cy.get(`#${id}`).should('have.attr', 'aria-required', 'true');
  }
  if (rules['maxlength']) {
    cy.get(`#${id}`).should(
      'have.attr',
      'maxlength',
      rules['maxlength'].toString()
    );
  }
});

Cypress.Commands.add("Verify input-number's value", ({ id, value, rules }) => {
  cy.get(`#${id}`)
    .should('have.class', INPUT_NUMBER)
    .should('have.value', value.toString());

  if (rules.require) {
    cy.get(`#${id}`).should('have.attr', 'aria-required', 'true');
  }
});
