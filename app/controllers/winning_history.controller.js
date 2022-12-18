const db = require("../models");
const WinningHistory = db.winningHistories;
const Op = db.Sequelize.Op;

// Create and Save a new WinningHistory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a WinningHistory
  const WinningHistory = {
    user_id: req.body.user_id,
    prize_id: req.body.prize_id,
    spin_count: req.body.spin_count
  };

  // Save Tutorial in the database
  WinningHistory.create(WinningHistory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the WinningHistory."
      });
    });
};

// Retrieve all WinningHistory from the database.
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;
  
    WinningHistory.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving WinningHistory."
        });
    });
};

// Find a single WinningHistory with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    WinningHistory.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find WinningHistory with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving WinningHistory with id=" + id
        });
    });
};

// Update a WinningHistory by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    WinningHistory.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "WinningHistory was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update WinningHistory with id=${id}. Maybe WinningHistory was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating WinningHistory with id=" + id
        });
    });
};

// Delete a WinningHistory with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    WinningHistory.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "WinningHistory was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete WinningHistory with id=${id}. Maybe WinningHistory was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete WinningHistory with id=" + id
        });
    });
};

// Delete all WinningHistorys from the database.
exports.deleteAll = (req, res) => {
    WinningHistory.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} WinningHistory were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all WinningHistory."
        });
    });
};
