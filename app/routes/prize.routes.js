module.exports = app => {
    const prizes = require("../controllers/prize.controller.js");
  
    var router = require("express").Router();
  
    // Create a new prize
    router.post("/", prizes.create);
  
    // Retrieve all prizes
    router.get("/", prizes.findAll);
  
    // Retrieve a single prize with id
    router.get("/:id", prizes.findOne);
  
    // Update a prize with id
    router.put("/:id", prizes.update);
  
    // Delete a prize with id
    router.delete("/:id", prizes.delete);
  
    // Delete all prizes
    router.delete("/", prizes.deleteAll);
  
    app.use('/api/prizes', router);
};