module.exports = app => {
    const user_plans = require("../controllers/user_plan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user_plan
    router.post("/", user_plans.create);
  
    // Retrieve all user_plans
    router.get("/", user_plans.findAll);
  
    // Retrieve a single user_plan with id
    router.get("/:id", user_plans.findOne);
  
    // Update a user_plan with id
    router.put("/:id", user_plans.update);
  
    // Delete a user_plan with id
    router.delete("/:id", user_plans.delete);
  
    // Delete all user_plans
    router.delete("/", user_plans.deleteAll);
  
    app.use('/api/user_plans', router);
};