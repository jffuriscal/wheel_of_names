const db = require("../models");
const Prize = db.prizes;
const Op = db.Sequelize.Op;

// Create and Save a new Prize
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Prize
  const prize = {
    name: req.body.name,
    value: req.body.value
  };

  // Save Tutorial in the database
  Prize.create(prize)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Prize."
      });
    });
};

// Retrieve all Prizes from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Prize.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Prizes."
        });
    });
};

// Find a single Prize with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Prize.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Prize with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Prize with id=" + id
        });
    });
};

// Update a Prize by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Prize.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Prize was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Prize with id=${id}. Maybe Prize was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Prize with id=" + id
        });
    });
};

// Delete a Prize with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Prize.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Prize was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Prize with id=${id}. Maybe Prize was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Prize with id=" + id
        });
    });
};

// Delete all Prizes from the database.
exports.deleteAll = (req, res) => {
    Prize.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Prizes were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all Prizes."
        });
    });
};
