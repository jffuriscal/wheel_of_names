module.exports = app => {
    const plans = require("../controllers/plan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new plan
    router.post("/", plans.create);
  
    // Retrieve all plans
    router.get("/", plans.findAll);
  
    // Retrieve a single plan with id
    router.get("/:id", plans.findOne);
  
    // Update a plan with id
    router.put("/:id", plans.update);
  
    // Delete a plan with id
    router.delete("/:id", plans.delete);
  
    // Delete all plans
    router.delete("/", plans.deleteAll);
  
    app.use('/api/plans', router);
};