const express = require("express");

const { getShops, createShop, createProduct } = require("./controllers");
const upload = require("../../middleware/multer");

const router = express.Router();
router.get("/", getShops);
router.post("/", createShop);
router.post("/:shopId/products", createProduct);
module.exports = router;
