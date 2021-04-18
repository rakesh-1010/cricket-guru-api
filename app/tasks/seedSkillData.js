const SKILLS = require("../db/skillsData");

const db = require("../models");
const Skill = db.skills;
// const Op = db.Sequelize.Op;

module.exports = function () {
    Object.keys(SKILLS).forEach(function(skillType) {
        SKILLS[skillType].forEach( function(skill) {
            Skill.findAndCountAll({
                where: {
                    skill_type: skillType,
                    name: skill
                  }
            }).then(data => {
                if(data.count == 0){
                    Skill.create({
                        skill_type: skillType,
                        name: skill
                    })
                }
            });
        });
    });
}

