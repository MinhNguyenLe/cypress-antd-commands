"use strict";

const { UPLOAD } = require('./antd-class-name')

Cypress.Commands.add("Verify upload's attribute", (id) =>
  cy
    .get(`.${UPLOAD}`)
    .find(`#${id}`)
    .should('have.attr', 'type', 'file')
    .should('have.attr', 'accept', 'image/*')
);
