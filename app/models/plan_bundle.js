module.exports = (sequelize, Sequelize) => {
    const PlanBundle = sequelize.define("plan_bundle", {
      plan_id: {
        type: Sequelize.STRING
      },
      prize_id: {
        type: Sequelize.STRING
      }
    });
  
    return PlanBundle;
};