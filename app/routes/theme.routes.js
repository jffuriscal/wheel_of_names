module.exports = app => {
    const themes = require("../controllers/theme.controller.js");
  
    var router = require("express").Router();
  
    // Create a new theme
    router.post("/", themes.create);
  
    // Retrieve all themes
    router.get("/", themes.findAll);
  
    // Retrieve a single theme with id
    router.get("/:id", themes.findOne);
  
    // Update a theme with id
    router.put("/:id", themes.update);
  
    // Delete a theme with id
    router.delete("/:id", themes.delete);
  
    // Delete all themes
    router.delete("/", themes.deleteAll);
  
    app.use('/api/themes', router);
};