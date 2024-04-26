const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.get("/listMember", AdminController.getListMember);
router.get("/listBook", AdminController.getListBook);
router.get("/adminPage", AdminController.getAdminPage);
router.get("/loginAdmin", AdminController.getLogin);
router.get("/inputMember", AdminController.getInputMember);
router.get("/addMember", AdminController.getAddMember);
router.get("/addBook", AdminController.getAddBook);
router.get("/inputBook", AdminController.getInputBook);
router.get("/addAnggota", AdminController.getAddAnggota);
router.get("/addPeminjaman", AdminController.getAddPeminjaman);
router.get("/inputPeminjaman", AdminController.getInputPeminjaman);
router.get("/searchBook", AdminController.getSearchBook);
router.get("/searchBooksAjax", AdminController.searchBooksAjax);
router.get("/searchMember", AdminController.getSearchMember);
router.get("/searchMemberAjax", AdminController.searchMemberAjax);
router.get("/editBook/:ISBN/:Judul", AdminController.getEditBook);
router.get("/logout", AdminController.logout);
router.post("/deleteMember/:id", AdminController.deleteMember);
router.post("/loginAdmin", AdminController.postLogin);
router.post("/inputMember", AdminController.postInputMember);
router.post("/inputBook", AdminController.postInputBook);
router.post("/editBook/:ISBN/:Judul", AdminController.postEditBook);
// router.post("/inputPeminjaman", AdminController.postInputPeminjaman);

module.exports = router;
