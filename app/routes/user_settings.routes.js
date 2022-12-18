module.exports = app => {
    const user_settings = require("../controllers/user_settings.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user_settings
    router.post("/", user_settings.create);
  
    // Retrieve all user_settings
    router.get("/", user_settings.findAll);
  
    // Retrieve a single user_setting with id
    router.get("/:id", user_settings.findOne);
  
    // Update a user_settings with id
    router.put("/:id", user_settings.update);
  
    // Delete a user_setting with id
    router.delete("/:id", user_settings.delete);
  
    // Delete all user_settings
    router.delete("/", user_settings.deleteAll);
  
    app.use('/api/user_settings', router);
};