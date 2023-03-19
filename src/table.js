"use strict";

const { TABLE_ROW } = require('./antd-class-name')

Cypress.Commands.add('Get first row of table', (className) => {
  cy.get(`.${className}`).find(`.${TABLE_ROW}`).first();
});
