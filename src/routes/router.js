const express = require("express");
const {
  getAllProducts,
  getDetailProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { register, login } = require("../controller/userController");
const { auth, adminAuth } = require("../middlewares/auth");
const { uploadImage } = require("../middlewares/upload");
const { runValidation } = require("../validators");
const { loginValidator } = require("../validators/loginValidator");
const { registerValidator } = require("../validators/registerValidator");
const router = express.Router();

router.post("/register", registerValidator, runValidation, register);
router.post("/login", loginValidator, runValidation, login);

router.get("/products", getAllProducts);
router.get("/product/:id", getDetailProduct);
router.post(
  "/product",
  auth,
  adminAuth,
  uploadImage.single("image"),
  addProduct
);
router.patch("/product/:id", auth, adminAuth, updateProduct);
router.delete("/product/:id", auth, adminAuth, deleteProduct);

module.exports = router;
