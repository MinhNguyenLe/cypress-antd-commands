"use strict";

const {
  DRAWER_FOOTER,
  SELECT_DROPDOWN,
  SELECT_ITEM,
  SELECT_SELECTION_ITEM,
  SELECT_SELECTOR,
} = require('./antd-class-name')

Cypress.Commands.add(
  "Verify single-selector's items",
  ({ id, items, orderDefaultValue }) => {
    cy.get(`#${id}`)
      .should('have.attr', 'type', 'search')
      .should('have.attr', 'role', 'combobox')
      .parents('.ant-select-selector')
      .click()
      .then(() => {
        cy.get(`.${SELECT_DROPDOWN}`)
          .find(`.${SELECT_ITEM}`)
          .each(($el, index) => {
            expect($el).to.have.attr('title', items[index]);

            if (index === orderDefaultValue) {
              expect($el).to.have.attr('aria-selected', 'true');
            } else {
              expect($el).to.have.attr('aria-selected', 'false');
            }
          });
      });
  }
);

Cypress.Commands.add("Verify single-select's default value", (id, value) => {
  cy.get(`#${id}`)
    .parents(`.${SELECT_SELECTOR}`)
    .find(`.${SELECT_SELECTION_ITEM}`)
    .should('have.attr', 'title', value.toString());
});

// use when multiple-select's data is constants
Cypress.Commands.add(
  "Verify multiple-select's items",
  ({ id, values, selected }) => {
    cy.get(`#${id}_list`)
      .parent()
      .find(`.${SELECT_ITEM}`)
      .should(($el) => {
        for (let i = 0; i < values.length; i += 1) {
          if (selected.includes(values[i]))
            expect($el[i]).to.have.attr('aria-selected', 'true');
          else expect($el[i]).to.have.attr('aria-selected', 'false');
        }
      });
  }
);

Cypress.Commands.add(
  "Verify multiple-select's default value",
  ({ id, selected }) => {
    cy.get(`#${id}`)
      .parents(`.${SELECT_SELECTOR}`)
      .click()
      .then(() => {
        cy.get(`#${id}_list`) // multiple select store options at id = 'my_id_list'
          .parent()
          .find('[aria-selected="true"]')
          .should(($el) => {
            for (let i = 0; i < selected.length; i += 1) {
              expect($el[i].title).to.equal(selected[i]);
            }
          });
      });
  }
);

Cypress.Commands.add('Select single option', ({ id, label }) => {
  cy.get(`#${id}`)
    .parents('.ant-select-selector')
    .click()
    .then(() =>
      cy
        .get(`.${SELECT_DROPDOWN}`)
        .find(`.${SELECT_ITEM}`)
        .contains(label)
        .click()
    );
});

Cypress.Commands.add('Select multiple options', ({ id, labels }) => {
  cy.get(`#${id}`)
    .parents('.ant-select-selector')
    .click()
    .then(() => {
      for (let i = 0; i < labels.length; i += 1) {
        cy.get(`.${SELECT_DROPDOWN}`)
          .find(`.${SELECT_ITEM}`)
          .contains(labels[i])
          .click();
      }
    })
    .then(() => cy.get(`.${DRAWER_FOOTER}`).click()); // click outside to close this selection
});
