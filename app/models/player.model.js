module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define("player", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.DOUBLE,
      dob: DataTypes.DATEONLY,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      role: DataTypes.STRING,
      batting_style: DataTypes.STRING,
      bowling_style: DataTypes.STRING
    }, {});

    return Player;
};
