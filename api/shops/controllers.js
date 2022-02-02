const Shop = require("../../models/Shop");
const Product = require("../../models/Product");
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("products", "name price");
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.createShop = async (req, res) => {
  try {
    const shops = await Shop.create(req.body);
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    req.body.shop = shopId;
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(
      { _id: shopId },
      { $push: { products: newProduct._id } }
    );
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};
