const db = require("../models");
const PlanBundle = db.planBundles;
const Op = db.Sequelize.Op;

// Create and Save a new PlanBundle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.plan_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a PlanBundle
  const planBundle = {
    plan_id: req.body.plan_id,
    prize_id: req.body.prize_id
  };

  // Save Tutorial in the database
  PlanBundle.create(planBundle)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PlanBundle."
      });
    });
};

// Retrieve all PlanBundles from the database.
exports.findAll = (req, res) => {
    const plan_id = req.query.plan_id;
    var condition = plan_id ? { plan_id: { [Op.like]: `%${plan_id}%` } } : null;
  
    PlanBundle.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving PlanBundles."
        });
    });
};

// Find a single PlanBundle with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PlanBundle.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find PlanBundle with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving PlanBundle with id=" + id
        });
    });
};

// Update a PlanBundle by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    PlanBundle.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PlanBundle was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update PlanBundle with id=${id}. Maybe PlanBundle was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PlanBundle with id=" + id
        });
    });
};

// Delete a PlanBundle with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PlanBundle.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PlanBundle was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete PlanBundle with id=${id}. Maybe PlanBundle was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete PlanBundle with id=" + id
        });
    });
};

// Delete all PlanBundles from the database.
exports.deleteAll = (req, res) => {
    PlanBundle.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} PlanBundles were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all PlanBundles."
        });
    });
};
