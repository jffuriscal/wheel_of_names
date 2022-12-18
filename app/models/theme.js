module.exports = (sequelize, Sequelize) => {
    const Theme = sequelize.define("theme", {
      color: {
        type: Sequelize.STRING
      },
      font: {
        type: Sequelize.STRING
      },
      font_size: {
        type: Sequelize.STRING
      }
    });
  
    return Theme;
};