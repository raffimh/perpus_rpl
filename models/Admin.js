const db = require("../utility/database");

class Admin {
  static findByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM admins WHERE email = ? AND password_admins = ?",
        [email, password],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        }
      );
    });
  }
}

module.exports = Admin;
