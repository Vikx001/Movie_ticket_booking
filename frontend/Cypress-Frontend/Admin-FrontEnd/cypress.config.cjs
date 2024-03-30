const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "s1nyen",
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
  }
});
