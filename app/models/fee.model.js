module.exports = (sequelize, DataTypes) => {
    const Fee = sequelize.define("fee", {
      player_id: DataTypes.INTEGER,
      month: DataTypes.DATEONLY,
      status: DataTypes.STRING,
      amount: DataTypes.DOUBLE
    }, {});
    return Fee;
};
