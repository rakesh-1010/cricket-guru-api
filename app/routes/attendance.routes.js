module.exports = app => {
    const attendances = require("../controllers/attendance.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Attendances
    router.post("/", attendances.create);

    // Update a attendances with id
    router.put("/:id", attendances.update);
  
    app.use('/api/attendances', router);
};