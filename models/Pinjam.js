const db = require("../utility/database");

module.exports = class Pinjam {
  constructor(
    tanggal_pinjam,
    perkiraan_pengembalian,
    id_anggota,
    ISBN,
    id_petugas,
    id
  ) {
    this.tanggal_pinjam = tanggal_pinjam;
    this.perkiraan_pengembalian = perkiraan_pengembalian;
    this.id_anggota = id_anggota;
    this.ISBN = ISBN;
    this.id_petugas = id_petugas;
    this.id = id;
  }

  static findAll() {
    return db.execute("SELECT * FROM pinjam LIMIT 10");
  }
};
