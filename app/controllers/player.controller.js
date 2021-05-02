const db = require("../models");
const Player = db.players;
const Skill = db.skills;
const Fee = db.fees;
const Attendance = db.attendances;
const Op = db.Sequelize.Op;

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Player should have a name!"
    });
    return;
  }

  // Create a Player
  const player = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    age: req.body.age,
    gender: req.body.gender,
    dob: req.body.dob,
    role: req.body.role,
    batting_style: req.body.batting_style,
    bowling_style: req.body.bowling_style,
  };

  // Save Player in the database
  Player.create(player)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Player.findAll({ where: condition,
    include: [
      {
        model: Skill,
        as: "skills",
        attributes: ["id", "skill_type", "name"]
      },
      {
        model: Fee,
        as: "fees"
      },
      {
        model: Attendance,
        as: "attendances"
      }
    ],
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving players."
    });
  });
};

exports.addSkills = (req, res) => {
  req.body.forEach((req) => {
    const playerId = req.playerId;
    const skillId = req.skillId;
    const rating = req.rating;
    return Player.findByPk(playerId)
      .then((player) => {
        if (!player) {
          throw new Error("player not found!");
          return null;
        }
        return Skill.findByPk(skillId).then((skill) => {
          if (!skill) {
            console.log("Skill not found!");
            return null;
          }

          player.addSkill(skill);
          console.log(`>> added skill id=${skill.id} to Player id=${player.id}`);
          res.send(player);
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: `>> Error while adding Skill to player:  ${err}`
        });
      });
  })
};

// Find a single Player with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Player.findByPk(id, {include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "skill_type", "name"]
        },
        {
          model: Fee,
          as: "fees"
        },
        {
          model: Attendance,
          as: "attendances"
        }
      ]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Player with id=" + id
        });
      });
};

// Update a Player by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Player.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Player was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Player with id=${id}. Maybe Player was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Player with id=" + id
        });
      });
};

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Player.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Player was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Player with id=${id}. Maybe Player was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Player with id=" + id
        });
      });
};

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
    Player.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Players were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Players."
          });
        });
};

// Find all Players based on a particular attribute
exports.findAllByAttr = (req, res) => {
    Player.findAll({ where: req.params })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};
