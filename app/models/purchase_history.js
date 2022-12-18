module.exports = (sequelize, Sequelize) => {
    const PurchaseHistory = sequelize.define("purchase_history", {
      user_id: {
        type: Sequelize.STRING
      },
      plan_id: {
        type: Sequelize.STRING
      }
    });
  
    return PurchaseHistory;
};