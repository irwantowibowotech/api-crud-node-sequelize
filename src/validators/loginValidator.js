const { check } = require("express-validator");

exports.loginValidator = [
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
