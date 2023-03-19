"use strict";

const { TABS_NAV, TABS_NAV_LIST, TABS_TAB } = require('./antd-class-name')

Cypress.Commands.add("Verify tab's items", (id, items) => {
  cy.get(`[data-cy=${id}]`)
    .find('[role="tablist"]')
    .should('have.class', TABS_NAV)
    .find(`.${TABS_NAV_LIST}`)
    .find(`.${TABS_TAB}`)
    .should('have.lengthOf', items.length);

  for (let i = 0; i < items.length; i += 1) {
    cy.get(`[data-cy=${id}]`)
      .find('[role="tablist"]')
      .find(`.${TABS_NAV_LIST}`)
      .find(`[data-node-key="${items[i].value.toString()}"]`)
      .find('[role="tab"]')
      .should('have.text', items[i].label);
  }
});

Cypress.Commands.add('Find by tab value', (id, value) =>
  cy
    .get(`[data-cy=${id}]`)
    .find('[role="tablist"]')
    .find(`.${TABS_NAV_LIST}`)
    .find(`[data-node-key="${value}"]`)
    .find('[role="tab"]')
    .click()
);
