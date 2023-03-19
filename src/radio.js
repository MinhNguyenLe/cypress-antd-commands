"use strict";

const { RADIO, RADIO_CHECKED, RADIO_INPUT } = require("./antd-class-name");

Cypress.Commands.add(
  "Verify radio's value",
  ({ id, value, defaultChecked }) => {
    cy.get(`#${id}`)
      .find(`.${RADIO}`)
      .should(($el) => {
        for (let i = 0; i < $el.length; i += 1) {
          if (value[i] === defaultChecked)
            expect($el[i]).to.have.class(`.${RADIO_CHECKED}`);
        }
      });

    cy.get(`#${id}`)
      .find(`.${RADIO_INPUT}`)
      .should(($el) => {
        for (let i = 0; i < $el.length; i += 1) {
          expect($el[i]).to.have.value(value[i].toString());
        }
      });
  }
);

Cypress.Commands.add("Choose radio", ({ id, label }) => {
  cy.get(`#${id}`).contains(label).click();
});
