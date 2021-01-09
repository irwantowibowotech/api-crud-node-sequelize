const { check } = require("express-validator");

exports.registerValidator = [
  check("name").not().isEmpty().withMessage("Nama harus diisi"),
  check("name")
    .isLength({ min: 3 })
    .withMessage("Nama harus minimal 3 karakter"),
  check("address").not().isEmpty().withMessage("Alamat tidak boleh kosong"),
  check("email").not().isEmpty().withMessage("Email wajib diisi!"),
  check("email").isEmail().withMessage("Format email tidak cocok"),
  check("password").not().isEmpty().withMessage("Password wajib diisi"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
  check("password")
    .isLength({ max: 30 })
    .withMessage("Password maksimal 20 karakter"),
];
