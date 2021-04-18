module.exports = app => {
    const skills = require("../controllers/skill.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", skills.create);
  
    // Retrieve all skills
    router.get("/", skills.findAll);
  
    // Retrieve all published skills
    router.get("/findAllByAttr/*", skills.findAllByAttr);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", skills.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", skills.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", skills.delete);
  
    // Delete all skills
    router.delete("/", skills.deleteAll);
  
    app.use('/api/skills', router);
  };