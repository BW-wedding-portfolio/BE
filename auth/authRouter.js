const express = require("express");
const router = express.Router();
const User = require("./auth-helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "Sever could not get user" });
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
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
