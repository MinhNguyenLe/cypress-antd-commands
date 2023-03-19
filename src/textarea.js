"use strict";

const { INPUT } = require('./antd-class-name')

Cypress.Commands.add("Verify textarea's value", ({ id, value, props, rules }) =>
  cy
    .get(`#${id}`)
    .should('have.class', INPUT)
    .should('have.attr', 'rows', props.rows.toString())
    .should('have.attr', 'aria-required', rules.require.toString())
    .should('have.value', value)
);
