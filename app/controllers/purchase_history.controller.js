const db = require("../models");
const PurchaseHistory = db.purchaseHistories;
const Op = db.Sequelize.Op;

// Create and Save a new PurchaseHistory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a PurchaseHistory
  const purchaseHistory = {
    user_id: req.body.user_id,
    plan_id: req.body.plan_id
  };

  // Save Tutorial in the database
  PurchaseHistory.create(purchaseHistory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PurchaseHistory."
      });
    });
};

// Retrieve all PurchaseHistorys from the database.
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;
  
    PurchaseHistory.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving PurchaseHistorys."
        });
    });
};

// Find a single PurchaseHistory with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PurchaseHistory.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find PurchaseHistory with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving PurchaseHistory with id=" + id
        });
    });
};

// Update a PurchaseHistory by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    PurchaseHistory.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PurchaseHistory was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update PurchaseHistory with id=${id}. Maybe PurchaseHistory was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PurchaseHistory with id=" + id
        });
    });
};

// Delete a PurchaseHistory with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PurchaseHistory.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PurchaseHistory was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete PurchaseHistory with id=${id}. Maybe PurchaseHistory was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete PurchaseHistory with id=" + id
        });
    });
};

// Delete all PurchaseHistorys from the database.
exports.deleteAll = (req, res) => {
    PurchaseHistory.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} PurchaseHistorys were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all PurchaseHistorys."
        });
    });
};
