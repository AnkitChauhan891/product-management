const express = require("express");
const authorizedUser = require("../middleware/authorizedUser");
const productController = require("../controller/productController");
const productRouter = express.Router();
const upload = require("../utils/multer")

productRouter.post("/", authorizedUser, productController.createProducts);
productRouter.get("/:product_id", productController.getProductById);
productRouter.put("/:product_id", authorizedUser, productController.updateProduct);
productRouter.delete("/:product_id", authorizedUser, productController.deleteProductById);
productRouter.get("/", productController.getProductDetails);
productRouter.post("/upload", upload.array("images", 5), productController.createImages);

module.exports = productRouter;