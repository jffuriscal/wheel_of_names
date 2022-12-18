const db = require("../models");
const WebsiteSettings = db.websiteSettings;
const Op = db.Sequelize.Op;

// Create and Save a new WebsiteSettings
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a WebsiteSettings
  const websiteSettings = {
    name: req.body.name,
    logo: req.body.logo,
    url: req.body.url,
    theme_id: req.body.theme_id
  };

  // Save Tutorial in the database
  WebsiteSettings.create(websiteSettings)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the WebsiteSettings."
      });
    });
};

// Retrieve all WebsiteSettings from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    WebsiteSettings.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving WebsiteSettings."
        });
    });
};

// Find a single WebsiteSettings with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    WebsiteSettings.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find WebsiteSettings with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving WebsiteSettings with id=" + id
        });
    });
};

// Update a WebsiteSettings by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    WebsiteSettings.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "WebsiteSettings was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update WebsiteSettings with id=${id}. Maybe WebsiteSettings was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating WebsiteSettings with id=" + id
        });
    });
};

// Delete a WebsiteSettings with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    WebsiteSettings.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "WebsiteSettings was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete WebsiteSettings with id=${id}. Maybe WebsiteSettings was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete WebsiteSettings with id=" + id
        });
    });
};

// Delete all WebsiteSettingss from the database.
exports.deleteAll = (req, res) => {
    WebsiteSettings.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} WebsiteSettings were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all WebsiteSettings."
        });
    });
};
