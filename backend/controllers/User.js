const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;

const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        lastName: req.body.lastName,
      });
      user
        .save()
        .then(() => {
          res.status(201).json(user);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                name: user.name,
                lastName: user.lastName,
                userId: user._id,
                role: user.role,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.myUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  User.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("id unknown :" + err);
  }).select("-passsword");
};

// module.exports.logout = (req, res) => {};
