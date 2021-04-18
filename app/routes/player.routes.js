module.exports = app => {
    const players = require("../controllers/player.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", players.create);
  
    // Retrieve all players
    router.get("/", players.findAll);
  
    // Retrieve all published players
    router.get("/findAllByAttr/*", players.findAllByAttr);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", players.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", players.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", players.delete);
  
    // Delete all players
    router.delete("/", players.deleteAll);

    // Add Skill
    router.post("/addSkills", players.addSkills);
  
    app.use('/api/players', router);
  };