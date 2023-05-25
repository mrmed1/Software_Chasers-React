const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    frontBaseUrl : "http://localhost:3000",
  },


  env: {
    urlBackend: "https://school.eastus.cloudapp.azure.com/api",
    baseUrl: "http://localhost:3000/api"
}
 
 
 
});
