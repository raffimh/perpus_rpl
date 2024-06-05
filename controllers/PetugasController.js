const db = require("../utility/database");
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

exports.getInputAnggota = (req, res, next) => {
  // Periksa apakah pengguna memiliki session yang valid dengan peran petugas
  if (req.session.user && req.session.user.role === "petugas") {
    // Render halaman input anggota
    res.render("inputAnggota", {
      pageTitle: "Input Anggota",
      path: "/inputAnggota",
      user: req.session.user,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } else {
    // Jika tidak memiliki session yang valid atau bukan petugas, redirect ke halaman login
    res.redirect("/loginAdmin");
  }
};

exports.postInputAnggota = async (req, res, next) => {
  const {
    id_petugas,
    nama,
    email,
    alamat,
    masa_berlaku,
    nomor,
    nik,
    tanggal_lahir,
  } = req.body;
  try {
    const [results, fields] = await db.execute(
      "INSERT INTO anggota (nama, email, alamat, masa_berlaku, nomor, nik, tanggal_lahir, id_petugas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nama, email, alamat, masa_berlaku, nomor, nik, tanggal_lahir, id_petugas]
    );
    if (results.affectedRows === 1) {
      req.flash("success", "Anggota berhasil ditambahkan");
      res.redirect("/inputAnggota");
    } else {
      req.flash("error", "Gagal menambahkan anggota");
      res.redirect("/inputAnggota");
    }
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/inputAnggota");
  }
};
