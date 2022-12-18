module.exports = (sequelize, Sequelize) => {
    const WinningHistory = sequelize.define("winning_history", {
      user_id: {
        type: Sequelize.STRING
      },
      prize_id: {
        type: Sequelize.STRING
      },
      spin_count: {
        type: Sequelize.STRING
      }
    });
  
    return WinningHistory;
};