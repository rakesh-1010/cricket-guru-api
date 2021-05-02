const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// setup db and orm
const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cricket guru application api." });
});


require("./app/routes/turorial.routes")(app);
require("./app/routes/player.routes")(app);
require("./app/routes/skill.routes")(app);
require("./app/routes/fee.routes")(app);
require("./app/routes/attendance.routes")(app);

var seedSkillData = require('./app/tasks/seedSkillData');
seedSkillData();
// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});