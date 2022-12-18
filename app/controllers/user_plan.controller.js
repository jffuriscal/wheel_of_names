const db = require("../models");
const UserPlan = db.userPlans;
const Op = db.Sequelize.Op;

// Create and Save a new UserPlan
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a UserPlan
  const userPlan = {
    user_id: req.body.user_id,
    plan_id: req.body.plan_id,
    is_subscribed: req.body.is_subscribed,
    payment_mode: req.body.payment_mode,
    spin_count: req.body.spin_count,
    plan_start: req.body.plan_start,
    plan_end: req.body.plan_end
  };

  // Save Tutorial in the database
  UserPlan.create(userPlan)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserPlan."
      });
    });
};

// Retrieve all UserPlans from the database.
exports.findAll = (req, res) => {
    const plan_id = req.query.plan_id;
    var condition = plan_id ? { plan_id: { [Op.like]: `%${plan_id}%` } } : null;
  
    UserPlan.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving UserPlans."
        });
    });
};

// Find a single UserPlan with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    UserPlan.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find UserPlan with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving UserPlan with id=" + id
        });
    });
};

// Update a UserPlan by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    UserPlan.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserPlan was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update UserPlan with id=${id}. Maybe UserPlan was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating UserPlan with id=" + id
        });
    });
};

// Delete a UserPlan with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserPlan.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserPlan was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete UserPlan with id=${id}. Maybe UserPlan was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete UserPlan with id=" + id
        });
    });
};

// Delete all UserPlans from the database.
exports.deleteAll = (req, res) => {
    UserPlan.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} UserPlans were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all UserPlans."
        });
    });
};
