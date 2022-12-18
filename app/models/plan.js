module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plan", {
      name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      spin_count: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Plan;
};