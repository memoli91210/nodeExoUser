const express = require("express");
const controle = require("../Controlers/UserController");
const router = express.Router();

router.post("/signup", controle.creation);
router.get("/:id", controle.afficherOne);
router.get("/getmajeur", controle.afficherMajeur);
router.post("/login", controle.connexion);
router.post("/islogin", controle.isLoggedIn);
router.get("/secret", controle.isLoggedIn, controle.authentif);
router.put("/modifier/:usern", controle.modifier);
router.delete("/:id", controle.supprimer);
router.put("/:id", controle.modifier);

module.exports = router;
