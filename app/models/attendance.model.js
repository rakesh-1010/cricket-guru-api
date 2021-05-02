module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("attendance", {
      player_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      status: DataTypes.STRING
    }, {});
    return Attendance;
};