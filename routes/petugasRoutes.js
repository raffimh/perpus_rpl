const express = require("express");
const router = express.Router();
const PetugasController = require("../controllers/PetugasController");

router.get("/petugasPage", PetugasController.getPetugasPage);

module.exports = router;
