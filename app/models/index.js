const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.players = require("./player.model.js")(sequelize, Sequelize);
db.skills = require("./skill.model.js")(sequelize, Sequelize);
db.fees = require("./fee.model.js")(sequelize, Sequelize);
db.attendances = require("./attendance.model.js")(sequelize, Sequelize);
db.playerSkills = require("./player_skill.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["player", "admin", "coach"];

db.players.belongsToMany(db.skills, {
  through: 'player_skill',
  foreignKey: 'player_id',
  as: 'skills'
});

db.skills.belongsToMany(db.players, {
  through: 'player_skill',
  foreignKey: 'skill_id',
  as: 'players'
});

db.players.hasMany(db.attendances, {
  foreignKey: 'player_id',
});

db.players.hasMany(db.fees, {
  foreignKey: 'player_id',
});

db.user.hasOne(db.players, {
  foreignKey: 'user_id',
});

module.exports = db;