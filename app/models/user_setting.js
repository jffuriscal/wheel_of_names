module.exports = (sequelize, Sequelize) => {
    const UserSetting = sequelize.define("user_settings", {
      user_id: {
        type: Sequelize.STRING
      },
      win_chance: {
        type: Sequelize.STRING
      },
      remaining_spin: {
        type: Sequelize.STRING
      }
    });
  
    return UserSetting;
};