const Anggota = require("../models/anggota");
const Buku = require("../models/Buku");
const Pinjam = require("../models/Pinjam");
const Petugas = require("../models/Petugas");
const db = require("../utility/database");

exports.getListMember = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  const anggotaId = req.params.anggotaId;
  Anggota.findAll(anggotaId)
    .then(anggota => {
      res.render("listMember", {
        anggota: anggota[0],
        searchQuery: searchQuery,
        user: req.session.user,
        pageTitle: "List Anggota",
        path: "/listMember",
        success: req.flash("success"),
        error: req.flash("error"),
      });
    })
    .catch(err => {
      console.error("Error saat mencari anggota:", err);
      res.status(500).send("Terjadi kesalahan saat mencari anggota");
    });
};

exports.getListPinjam = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  const pinjamId = req.params.pinjamId;
  Pinjam.findAll(pinjamId)
    .then(pinjam => {
      res.render("listPinjam", {
        pinjam: pinjam[0],
        searchQuery: searchQuery,
        user: req.session.user,
        pageTitle: "List Peminjaman",
        path: "/listPinjam",
        success: req.flash("success"),
        error: req.flash("error"),
      });
    })
    .catch(err => {
      console.error("Error saat mencari peminjaman:", err);
      res.status(500).send("Terjadi kesalahan saat mencari peminjaman");
    });
};

exports.getListPetugas = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  const petugasId = req.params.petugasId;
  Petugas.findAll(petugasId)
    .then(petugas => {
      res.render("listPetugas", {
        petugas: petugas[0],
        searchQuery: searchQuery,
        user: req.session.user,
        pageTitle: "List Petugas",
        path: "/listPetugas",
        success: req.flash("success"),
        error: req.flash("error"),
      });
    })

    .catch(err => {
      console.error("Error saat mencari petugas:", err);
      res.status(500).send("Terjadi kesalahan saat mencari petugas");
    });
};

exports.getListBook = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  const bukuId = req.params.bukuId;
  Buku.findAll(bukuId)
    .then(buku => {
      res.render("listBook", {
        buku: buku[0],
        searchQuery: searchQuery,
        user: req.session.user,
        pageTitle: "List Buku",
        path: "/listBook",
        success: req.flash("success"),
        error: req.flash("error"),
      });
    })
    .catch(err => {
      console.error("Error saat mencari buku:", err);
      res.status(500).send("Terjadi kesalahan saat mencari buku");
    });
};

exports.getSearchPinjam = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery || "";
    const [pinjam, fields] = await db.execute(
      `SELECT * FROM pinjam WHERE id_anggota LIKE ? OR ISBN LIKE ? LIMIT 7`,
      [`%${searchQuery}%`, `%${searchQuery}%`]
    );
    res.render("searchPinjam", {
      pinjam: pinjam,
      user: req.session.user,
      searchQuery: searchQuery,
      pageTitle: "Pencarian Peminjaman",
      path: "/searchPinjam",
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while fetching pinjam data");
    res.redirect("/searchPinjam");
  }
};

exports.searchPinjamAjax = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery || "";
    const [pinjam, fields] = await db.execute(
      `SELECT * FROM pinjam WHERE id_anggota LIKE ? OR ISBN LIKE ? LIMIT 7`,
      [`%${searchQuery}%`, `%${searchQuery}%`]
    );
    res.json({ pinjam });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pinjam data" });
  }
};

exports.getSearchBook = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery || "";
    const [buku, fields] = await db.execute(
      `SELECT * FROM buku WHERE Judul LIKE ?`,
      [`%${searchQuery}%`]
    );
    res.render("searchBook", {
      buku: buku,
      user: req.session.user,
      searchQuery: searchQuery,
      pageTitle: "Pencarian Buku",
      path: "/searchBook",
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while fetching book data");
    res.redirect("/searchBook");
  }
};

exports.getSearchMember = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery || "";
    const [anggota, fields] = await db.execute(
      `SELECT * FROM anggota WHERE nama LIKE ? OR email LIKE ? LIMIT 7`,
      [`%${searchQuery}%`, `%${searchQuery}%`]
    );
    res.render("searchMember", {
      anggota: anggota,
      user: req.session.user,
      searchQuery: searchQuery,
      pageTitle: "Pencarian Anggota",
      path: "/searchMember",
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while fetching member data");
    res.redirect("/searchMember");
  }
};

exports.searchMemberAjax = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery || "";
    const [anggota, fields] = await db.execute(
      `SELECT * FROM anggota WHERE nama LIKE ? LIMIT 7`,
      [`%${searchQuery}%`]
    );
    res.json({ members: anggota });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching member data" });
  }
};

exports.searchBooksAjax = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery || "";
    const [books, fields] = await db.execute(
      `SELECT * FROM buku WHERE Judul LIKE ? LIMIT 7`, // Batasi jumlah buku menjadi 5
      [`%${searchQuery}%`]
    );
    res.json({ books });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching book data" });
  }
};

exports.getIndex = (req, res, next) => {
  res.render("homePage", {
    pageTitle: "Home Page",
    path: "/",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("loginAdmin", {
    pageTitle: "Login",
    path: "/loginAdmin",
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

exports.getAdminPage = async (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  // Periksa apakah pengguna memiliki session yang valid dengan peran admin
  if (req.session.user && req.session.user.role === "admin") {
    // Render halaman admin
    res.render("adminPage", {
      pageTitle: "Admin Page",
      path: "/adminPage",
      searchQuery: searchQuery,
      user: req.session.user,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } else {
    // Jika tidak memiliki session yang valid atau bukan admin, redirect ke halaman login
    res.redirect("/loginAdmin");
  }
};

exports.getSignup = (req, res, next) => {
  res.render("signupAdmin", {
    pageTitle: "Signup",
    path: "/signupAdmin",
  });
};

exports.getInputMember = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  res.render("inputMember", {
    pageTitle: "Input Member",
    path: "/inputMember",
    searchQuery: searchQuery,
    user: req.session.user,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

exports.getAddMember = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  res.render("addMember", {
    pageTitle: "Add Member",
    path: "/addMember",
    searchQuery: searchQuery,
    user: req.session.user,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

exports.getAddBook = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  res.render("addBook", {
    pageTitle: "Add Book",
    path: "/addBook",
    searchQuery: searchQuery,
    user: req.session.user,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};
exports.getInputBook = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  res.render("inputBook", {
    pageTitle: "Input Book",
    path: "/inputBook",
    searchQuery: searchQuery,
    user: req.session.user,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

exports.getAddAnggota = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  res.render("addAnggota", {
    pageTitle: "Add Anggota",
    path: "/addAnggota",
    searchQuery: searchQuery,
    user: req.session.user,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

exports.getAddPeminjaman = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  res.render("addPeminjaman", {
    pageTitle: "Add Peminjaman",
    path: "/addPeminjaman",
    user: req.session.user,
    searchQuery: searchQuery,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const petugasData = db.execute("SELECT id, nama FROM petugas");
exports.getInputPeminjaman = (req, res, next) => {
  const searchQuery = req.query.searchQuery || "";
  res.render("inputPeminjaman", {
    pageTitle: "Input Peminjaman",
    path: "/inputPeminjaman",
    searchQuery: searchQuery,
    user: req.session.user,
    petugasData: petugasData[0],
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

// exports.getInputPeminjaman = async (req, res, next) => {
//   try {
//     const [petugasData, fields] = await db.execute(
//       "SELECT id, nama FROM petugas"
//     );
//     res.render("inputPeminjaman", {
//       pageTitle: "Input Peminjaman",
//       path: "/inputPeminjaman",
//       user: req.session.user,
//       petugasData: petugasData,
//       success: req.flash("success"),
//       error: req.flash("error"),
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     req.flash("error", "An error occurred while fetching petugas data");
//     res.redirect("/inputPeminjaman");
//   }
// };

// exports.postLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);

//   try {
//     const [results, fields] = await db.execute(
//       "SELECT * FROM admins WHERE email = ? AND password_admins = ?",
//       [email, password]
//     );

//     if (results.length > 0) {
//       return res.redirect("/adminPage");
//     } else {
//       return res.redirect("/loginAdmin");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return res.redirect("/loginAdmin");
//   }
// };

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [adminResults, adminFields] = await db.execute(
      "SELECT * FROM admins WHERE email = ? AND password_admins = ?",
      [email, password]
    );

    if (adminResults.length > 0) {
      req.session.user = {
        id: adminResults[0].id,
        email: adminResults[0].email,
        role: "admin",
      };
      return res.redirect("/adminPage");
    } else {
      const [petugasResults, petugasFields] = await db.execute(
        "SELECT * FROM petugas WHERE email = ? AND password_petugas = ?",
        [email, password]
      );
      if (petugasResults.length > 0) {
        req.session.user = {
          id: petugasResults[0].id,
          email: petugasResults[0].email,
          role: "petugas",
        };
        return res.redirect("/petugasPage");
      } else {
        req.flash("error", "Wrong email or password!");
        return res.redirect("/loginAdmin");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.redirect("/loginAdmin");
  }
};

exports.postInputMember = async (req, res) => {
  const {
    id_admin,
    nama,
    tanggal_lahir,
    nomor_telepon,
    email,
    password,
    alamat,
  } = req.body;
  console.log(req.body);

  try {
    const [results, fields] = await db.execute(
      "INSERT INTO petugas (email, tanggal_lahir, nomor_telepon, alamat, nama, id_admin, password_petugas) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [email, tanggal_lahir, nomor_telepon, alamat, nama, id_admin, password]
    );

    if (results.affectedRows > 0) {
      req.flash("success", "Data Saved Successfully!");
      return res.redirect("/addMember");
    } else {
      req.flash("error", "Data Not Saved!");
      return res.redirect("/inputMember");
    }
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while saving data!");
    return res.redirect("/inputMember");
  }
};

exports.postInputPeminjaman = async (req, res) => {
  const {
    tanggal_pinjam,
    perkiraan_pengembalian,
    id_anggota,
    ISBN,
    id_petugas,
  } = req.body;
  console.log(req.body);

  try {
    const [results, fields] = await db.execute(
      "INSERT INTO pinjam (tanggal_pinjam, perkiraan_pengembalian, id_anggota, ISBN, id_petugas) VALUES (?, ?, ?, ?, ?)",
      [tanggal_pinjam, perkiraan_pengembalian, id_anggota, ISBN, id_petugas]
    );

    if (results.affectedRows > 0) {
      req.flash("success", "Data Saved Successfully!");
      return res.redirect("/addPeminjaman");
    } else {
      req.flash("error", "Data Not Saved!");
      return res.redirect("/inputPeminjaman");
    }
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while saving data!");
    return res.redirect("/inputPeminjaman");
  }
};

exports.postInputBook = async (req, res) => {
  const { ISBN, Judul, Status, Pengarang, Penerbit, Tahun, id_admins } =
    req.body;
  console.log(req.body);

  try {
    const [results, fields] = await db.execute(
      "INSERT INTO buku (ISBN, Judul, Status, Pengarang, Penerbit, Tahun, id_admins) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ISBN, Judul, Status, Pengarang, Penerbit, Tahun, id_admins]
    );

    if (results.affectedRows > 0) {
      req.flash("success", "Data Saved Successfully!");
      return res.redirect("/addBook");
    } else {
      req.flash("error", "Data Not Saved!");
      return res.redirect("/inputBook");
    }
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while saving data!");
    return res.redirect("/inputBook");
  }
};
exports.getEditBook = async (req, res) => {
  try {
    const { ISBN, Judul } = req.params;

    // Query database untuk mendapatkan detail buku berdasarkan ISBN dan Judul
    const [books, fields] = await db.execute(
      "SELECT * FROM buku WHERE ISBN = ? AND Judul = ?",
      [ISBN, Judul]
    );

    if (books.length > 0) {
      res.render("editBook", {
        book: books[0],
        pageTitle: "Edit Buku",
        path: "/editBook",
        user: req.session.user,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      req.flash("error", "Buku tidak ditemukan");
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while fetching book data");
    res.redirect("/");
  }
};

exports.postEditBook = async (req, res) => {
  const { ISBN, Judul, Status, Pengarang, Penerbit, Tahun, id_admins } =
    req.body;
  const { ISBN: originalISBN, Judul: originalJudul } = req.params;

  try {
    const [results, fields] = await db.execute(
      "UPDATE buku SET ISBN=?, Judul=?, Status=?, Pengarang=?, Penerbit=?, Tahun=?, id_admins=? WHERE ISBN=? AND Judul=?",
      [
        ISBN,
        Judul,
        Status,
        Pengarang,
        Penerbit,
        Tahun,
        id_admins,
        originalISBN,
        originalJudul,
      ]
    );

    if (results.affectedRows > 0) {
      req.flash("success", "Book updated successfully!");
      return res.redirect("/listBook");
    } else {
      req.flash("error", "Failed to update book!");
      return res.redirect(`/editBook/${originalISBN}/${originalJudul}`);
    }
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while updating book data");
    return res.redirect(`/editBook/${originalISBN}/${originalJudul}`);
  }
};

exports.deleteMember = async (req, res) => {
  const memberId = req.params.id;
  console.log("Deleting member with ID:", memberId);

  try {
    const [results, fields] = await db.execute(
      "DELETE FROM anggota WHERE id = ?",
      [memberId]
    );

    if (results.affectedRows > 0) {
      req.flash("success", "Member deleted successfully!");
    } else {
      req.flash("error", "Failed to delete member.");
    }

    return res.redirect("/listMember");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "An error occurred while deleting member.");
    return res.redirect("/listMember");
  }
};

exports.logout = (req, res) => {
  // Hapus session pengguna
  req.session.destroy(err => {
    if (err) {
      console.error("Error saat logout:", err);
      return res.redirect("/");
    }
    res.redirect("/login");
  });
};
