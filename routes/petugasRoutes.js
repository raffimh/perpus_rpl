const express = require("express");
const router = express.Router();
const PetugasController = require("../controllers/PetugasController");

router.get("/petugasPage", PetugasController.getPetugasPage);
router.get("/inputAnggota", PetugasController.getInputAnggota);
router.post("/inputAnggota", PetugasController.postInputAnggota);

module.exports = router;
