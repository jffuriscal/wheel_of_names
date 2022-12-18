module.exports = app => {
    const winning_histories = require("../controllers/winning_history.controller.js");
  
    var router = require("express").Router();
  
    // Create a new winning_histories
    router.post("/", winning_histories.create);
  
    // Retrieve all winning_histories
    router.get("/", winning_histories.findAll);
  
    // Retrieve a single winning_histories with id
    router.get("/:id", winning_histories.findOne);
  
    // Update a winning_histories with id
    router.put("/:id", winning_histories.update);
  
    // Delete a winning_histories with id
    router.delete("/:id", winning_histories.delete);
  
    // Delete all winning_histories
    router.delete("/", winning_histories.deleteAll);
  
    app.use('/api/winning_histories', router);
};