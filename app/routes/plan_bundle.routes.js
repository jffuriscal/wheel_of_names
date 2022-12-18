module.exports = app => {
    const plan_bundles = require("../controllers/plan_bundle.controller.js");
  
    var router = require("express").Router();
  
    // Create a new plan_bundle
    router.post("/", plan_bundles.create);
  
    // Retrieve all plan_bundles
    router.get("/", plan_bundles.findAll);
  
    // Retrieve a single plan_bundle with id
    router.get("/:id", plan_bundles.findOne);
  
    // Update a plan with id
    router.put("/:id", plan_bundles.update);
  
    // Delete a plan with id
    router.delete("/:id", plan_bundles.delete);
  
    // Delete all plan_bundles
    router.delete("/", plan_bundles.deleteAll);
  
    app.use('/api/plan_bundles', router);
};