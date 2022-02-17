const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.creation = async (req, res) => {
  try {
    let user = await User.create(req.body);
    res.status(200).json({ message: "User créé" });
  } catch (err) {
    res.status(400).json({ message: "Erreur pendant inscription" });
  }
};

exports.afficherOne = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.afficherMajeur = async (req, res) => {
  try {
    let users = await User.find({ age: { $gte: 18 } });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.supprimer = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);
    await user.delete();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.modifier = async (req, res) => {
  try {
    let { id } = req.params;
    let { age } = req.body;
    let user = await User.findById(id);
    user.age = age;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.connexion = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      let isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        let token = jwt.sign({ id: user.id }, "secret_key", {
          expiresIn: "3h",
        });
        res.status(200).json({ token, email: user.email });
      } else {
        res.status(400).json({ message: "Invalid mot de pass" });
      }
    } else res.status(400).json({ message: "User n'éxiste pas" });
  } catch (err) {
    res.status(400).json({ message: "Erreur pendant inscription" });
  }
};

exports.isLoggedIn = (req, res, next) => {
  let token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, "secret_key", function (err, payload) {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else next();
  });
};

exports.authentif = (req, res) => {
  res.send("Utilisateur authentifie");
};

exports.modifier = async (req, res) => {
  try {
    let { usern } = req.params;
    let { username, password } = req.body;
    let user = await User.findOne({ username: usern });
    user.username = username;
    user.password = password;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
