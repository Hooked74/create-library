import Sinon from "cypress/types/sinon";

describe("Squares", () => {
  describe("Red square", () => {
    beforeEach(() => {
      cy.visit("/iframe.html?id=squares--red-square");
    });

    it("The color of the square should be red", () => {
      cy.get("div[role=button]").should("have.css", "background-color", "rgb(255, 0, 0)");
    });

    it("Verify alert when clicking on a square", () => {
      const stub: Cypress.Agent<Sinon.SinonStub> = cy.stub();
      cy.on("window:alert", stub);

      cy.get("div[role=button]")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith("It is handler!");
        });
    });
  });

  describe("Blue square", () => {
    beforeEach(() => {
      cy.visit("/iframe.html?id=squares--blue-square");
    });

    it("The color of the square should be blue", () => {
      cy.get("div[role=button]").should("have.css", "background-color", "rgb(0, 0, 255)");
    });
  });
});

export default {};
