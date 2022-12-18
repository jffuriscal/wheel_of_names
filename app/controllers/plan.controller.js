const db = require("../models");
const Plan = db.plans;
const Op = db.Sequelize.Op;

// Create and Save a new Plan
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Plan
  const plan = {
    name: req.body.name,
    duration: req.body.description,
    spin_count: req.body.spin_count,
    description: req.body.description,
    active: req.body.active,
    price: req.body.price
  };

  // Save Tutorial in the database
  Plan.create(plan)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Plan."
      });
    });
};

// Retrieve all Plans from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Plan.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Plans."
        });
    });
};

// Find a single Plan with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Plan.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Plan with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Plan with id=" + id
        });
    });
};

// Update a Plan by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Plan.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Plan was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Plan with id=${id}. Maybe Plan was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Plan with id=" + id
        });
    });
};

// Delete a Plan with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Plan.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Plan was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Plan with id=${id}. Maybe Plan was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Plan with id=" + id
        });
    });
};

// Delete all Plans from the database.
exports.deleteAll = (req, res) => {
    Plan.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Plans were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all Plans."
        });
    });
};
