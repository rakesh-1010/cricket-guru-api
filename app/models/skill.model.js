module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skill", {
      skill_type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }
    
    });
  
    return Skill;
};
