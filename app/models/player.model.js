module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.DOUBLE
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING

      },
      batting_style: {
        type: Sequelize.STRING
      },
      bowling_style: {
        type: Sequelize.STRING
      },
    });
  
    return Player;
};
