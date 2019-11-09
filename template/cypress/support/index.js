import "./commands";

// We have to use a `before` otherwise Cypress will complain about `cy.wrap` being used outside a test
before(function() {
  // use cy.wrap().__proto__ because we don't have access to the $Chainer.prototype directly
  // cy commands return $Chainer and the __proto__ value is $Chainer.prototype
  cy.wrap("").__proto__.promisify = function() {
    return new Promise((resolve, reject) => {
      // We must subscribe to failures and bail. Without this, the Cypress runner would never stop
      Cypress.on("fail", rejectPromise);

      // // unsubscribe from test failure on both success and failure. This cleanup is essential
      function resolvePromise(value) {
        resolve(value);
        Cypress.off("fail", rejectPromise);
      }
      function rejectPromise(error) {
        reject(error);
        Cypress.off("fail", rejectPromise);
      }

      this.then(resolvePromise);
    });
  };
});
