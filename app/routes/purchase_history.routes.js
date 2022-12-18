module.exports = app => {
    const purchase_histories = require("../controllers/purchase_history.controller.js");
  
    var router = require("express").Router();
  
    // Create a new purchase_history
    router.post("/", purchase_histories.create);
  
    // Retrieve all purchase_histories
    router.get("/", purchase_histories.findAll);
  
    // Retrieve a single purchase_history with id
    router.get("/:id", purchase_histories.findOne);
  
    // Update a purchase_history with id
    router.put("/:id", purchase_histories.update);
  
    // Delete a purchase_history with id
    router.delete("/:id", purchase_histories.delete);
  
    // Delete all purchase_histories
    router.delete("/", purchase_histories.deleteAll);
  
    app.use('/api/purchase_histories', router);
};