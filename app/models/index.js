const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

async function initialize() {
    // create db if it doesn't already exist
    const { HOST, USER, PASSWORD, DB } = dbConfig;

    console.log(HOST, USER, PASSWORD);

    const connection = await mysql.createConnection({
        host     : HOST,
        user     : USER,
        password : PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);

};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.initialize = initialize;
db.Sequelize  = Sequelize;
db.sequelize  = sequelize;

// db.tutorials             = require("./tutorial.model.js")(sequelize, Sequelize);
db.planBundles           = require("./plan_bundle.js")(sequelize, Sequelize);
db.plans                 = require("./plan.js")(sequelize, Sequelize);
db.prizes                = require("./prize.js")(sequelize, Sequelize);
db.purchaseHistories     = require("./purchase_history.js")(sequelize, Sequelize);
db.themes                = require("./theme.js")(sequelize, Sequelize);
db.userPlans             = require("./user_plan.js")(sequelize, Sequelize);
db.userSettings          = require("./user_setting.js")(sequelize, Sequelize);
db.users                 = require("./user.js")(sequelize, Sequelize);
db.websiteSettings       = require("./website_settings.js")(sequelize, Sequelize);
db.winningHistories      = require("./winning_history.js")(sequelize, Sequelize);

module.exports = db;



