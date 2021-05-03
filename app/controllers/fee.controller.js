const db = require("../models");
const Fee = db.fees;

// Create and Save a new Fee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.month) {
    res.status(400).send({
      message: "Fees should have a month!"
    });
    return;
  }
  // Create a Fee
  const fee = {
    player_id: req.body.player_id,
    month: req.body.month,
    status: req.body.status,
    amount: req.body.amount
  };

  // Save Fee in the database
  Fee.create(fee)
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

// Update a Fee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Fee.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Fee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Fee with id=${id}. Maybe Fee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Fee with id=" + id
        });
      });
};