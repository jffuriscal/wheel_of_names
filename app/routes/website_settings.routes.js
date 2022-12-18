module.exports = app => {
    const website_settings = require("../controllers/website_settings.controller.js");
  
    var router = require("express").Router();
  
    // Create a new website_settings
    router.post("/", website_settings.create);
  
    // Retrieve all website_settings
    router.get("/", website_settings.findAll);
  
    // Retrieve a single website_settings with id
    router.get("/:id", website_settings.findOne);
  
    // Update a website_settings with id
    router.put("/:id", website_settings.update);
  
    // Delete a website_settings with id
    router.delete("/:id", website_settings.delete);
  
    // Delete all website_settings
    router.delete("/", website_settings.deleteAll);
  
    app.use('/api/website_settings', router);
};