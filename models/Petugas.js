const db = require("../utility/database");

module.exports = class Petugas {
  constructor(
    id,
    email,
    tanggal_lahir,
    nomor_telepon,
    alamat,
    nama,
    id_admin,
    password_petugas
  ) {
    this.id = id;
    this.email = email;
    this.tanggal_lahir = tanggal_lahir;
    this.nomor_telepon = nomor_telepon;
    this.alamat = alamat;
    this.nama = nama;
    this.id_admin = id_admin;
    this.password_petugas = password_petugas;
  }

  static findAll() {
    return db.execute("SELECT * FROM petugas LIMIT 10");
  }
};
