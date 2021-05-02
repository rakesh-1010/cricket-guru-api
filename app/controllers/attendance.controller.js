const db = require("../models");
const Attendance = db.attendances;

// Create and Save a new Attendance
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({
      message: "Attendance should have a date!"
    });
    return;
  }

  // Create a Attendance
  const attendance = {
    player_id: req.body.player_id,
    date: req.body.date,
    status: req.body.status
  };

  // Save Attendance in the database
  Attendance.create(attendance)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Skill."
      });
    });
  
};

// Update a Attendance by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Attendance.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Attendance was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Attendance with id=${id}. Maybe Attendance was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Attendance with id=" + id
        });
      });
};