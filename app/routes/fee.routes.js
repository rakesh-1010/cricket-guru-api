module.exports = app => {
    const fees = require("../controllers/fee.controller.js");
  
    var router = require("express").Router();
  
    // Create a new fees
    router.post("/", fees.create);

    // Update a fees with id
    router.put("/:id", fees.update);
  
    app.use('/api/fees', router);
};