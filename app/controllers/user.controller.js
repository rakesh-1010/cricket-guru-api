exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.playerBoard = (req, res) => {
        res.status(200).send("Player Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.coachBoard = (req, res) => {
    res.status(200).send("Coach Content.");
};