const db = require("../models");
const UserSettings = db.userSettings;
const Op = db.Sequelize.Op;

// Create and Save a new UserSettings
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a UserSettings
  const userSettings = {
    user_id: req.body.user_id,
    win_chance: req.body.win_chance,
    remaining_spin: req.body.remaining_spin
  };

  // Save Tutorial in the database
  UserSettings.create(userSettings)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserSettings."
      });
    });
};

// Retrieve all UserSettings from the database.
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;
  
    UserSettings.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving UserSettings."
        });
    });
};

// Find a single UserSettings with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    UserSettings.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find UserSettings with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving UserSettings with id=" + id
        });
    });
};

// Update a UserSettings by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    UserSettings.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserSettings was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update UserSettings with id=${id}. Maybe UserSettings was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating UserSettings with id=" + id
        });
    });
};

// Delete a UserSettings with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserSettings.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserSettings was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete UserSettings with id=${id}. Maybe UserSettings was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete UserSettings with id=" + id
        });
    });
};

// Delete all UserSettingss from the database.
exports.deleteAll = (req, res) => {
    UserSettings.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} UserSettings were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all UserSettings."
        });
    });
};
