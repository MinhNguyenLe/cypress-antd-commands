'use strict'

const {
  COLLAPSE_EXPAND_ICON,
  COLLAPSE_HEADER,
  COLLAPSE_ITEM,
} = require("./antd-class-name");

Cypress.Commands.add("Verify collapse's items", ({ className, items }) => {
  cy.get(`.${className}`)
    .find(`.${COLLAPSE_ITEM}`)
    .should("have.lengthOf", items.length);

  cy.get(`.${className}`)
    .find(`.${COLLAPSE_ITEM}`)
    .should(($el) => {
      for (let i = 0; i < items.length; i += 1) {
        expect($el.find(`.${COLLAPSE_HEADER}`)).to.have.attr(
          "aria-expanded",
          items[i].expanded.toString()
        );
      }
    });
});

/**
 * @description
 * Antd Collapse have 2 wave to toggle: click header or click expand icon
 */
Cypress.Commands.add("Toggle collapse by header", ({ className, order }) => {
  cy.get(`.${className}`)
    .find(`.${COLLAPSE_ITEM}`)
    .should(($el) => $el.find(`.${COLLAPSE_HEADER}`)[order].click());
});
Cypress.Commands.add(
  "Toggle collapse by expand icon",
  ({ className, order }) => {
    cy.get(`.${className}`)
      .find(`.${COLLAPSE_ITEM}`)
      .should(($el) => $el.find(`.${COLLAPSE_EXPAND_ICON}`)[order].click());
  }
);
