module.exports = (sequelize, Sequelize) => {
    const WebsiteSettings = sequelize.define("website_settings", {
      logo: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      theme_id: {
        type: Sequelize.STRING
      }
    });
  
    return WebsiteSettings;
};