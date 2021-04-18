'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerSkill = sequelize.define('player_skill', {
    player_id: DataTypes.INTEGER,
    skill_id: DataTypes.INTEGER,
    rating: DataTypes.STRING
  }, {});
  
  return PlayerSkill;
};