module.exports = (sequelize, Sequelize) => {
    const Prize = sequelize.define("prize", {
      plan_id: {
        type: Sequelize.STRING
      },
      prize_id: {
        type: Sequelize.STRING
      }
    });
  
    return Prize;
};