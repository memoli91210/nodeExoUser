const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/UserModel");
const RouteUser = require("./Routes/RouteUser");
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://*****@cluster0.raum0.mongodb.net/DBUser?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/users", RouteUser);

app.listen(port, () => console.log(`serveur running on port: ${port}`));
