const express = require("express");
const router = express.Router();
const User = require("./auth-helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const restricted = require("../middleware/restricted");

router.get("/", restricted, (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not get users" });
    });
});

router.post("/register", (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);

  User.register({ first_name, last_name, username, password: hash })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not register user" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.login({ username })
    .then(user => {
      const authenticated = bcrypt.compareSync(password, user.password);
      if (user && authenticated) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not log you in" });
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
