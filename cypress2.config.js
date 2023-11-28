const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  viewportWidth: 800,
  viewportHeight: 480
});
