const db = require("../models");
const Role = db.role;

module.exports = function initialRoles() {
    Role.findOne({ where: { name: 'player' } }).then((role) => {
        if(!role){
            Role.create({
                name: "player"
            });
        }
    }) 
   
    Role.findOne({ where: { name: 'coach' } }).then((role) => {
        if(!role){
            Role.create({
                name: "coach"
            });
        }
    }) 
   
    Role.findOne({ where: { name: 'admin' } }).then((role) => {
        if(!role){
            Role.create({
                name: "admin"
            });
        }
    }) 
}