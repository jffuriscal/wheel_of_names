const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

// require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/plan.routes")(app);
require("./app/routes/prize.routes")(app);
require("./app/routes/theme.routes")(app);
require("./app/routes/user_plan.routes")(app);
require("./app/routes/plan_bundle.routes")(app);
require("./app/routes/user_settings.routes")(app);
require("./app/routes/winning_history.routes")(app);
require("./app/routes/purchase_history.routes")(app);
require("./app/routes/website_settings.routes")(app);

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await db.initialize();

  db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

  console.log(`Server is running on port ${PORT}.`);
});
