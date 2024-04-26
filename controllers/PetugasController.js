exports.getPetugasPage = (req, res, next) => {
  // Periksa apakah pengguna memiliki session yang valid dengan peran petugas
  if (req.session.user && req.session.user.role === "petugas") {
    // Render halaman petugas
    res.render("petugasPage", {
      pageTitle: "Petugas Page",
      path: "/petugasPage",
      user: req.session.user,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } else {
    // Jika tidak memiliki session yang valid atau bukan petugas, redirect ke halaman login
    res.redirect("/loginAdmin");
  }
};
