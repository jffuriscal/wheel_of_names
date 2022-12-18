module.exports = (sequelize, Sequelize) => {
    const UserPlan = sequelize.define("user_plan", {
      user_id: {
        type: Sequelize.STRING
      },
      plan_id: {
        type: Sequelize.STRING
      },
      is_subscribed: {
        type: Sequelize.BOOLEAN
      },
      payment_mode: {
        type: Sequelize.STRING
      },
      spin_count: {
        type: Sequelize.STRING
      },
      plan_start: {
        type: Sequelize.STRING
      },
      plan_end: {
        type: Sequelize.STRING
      }
    });
  
    return UserPlan;
};