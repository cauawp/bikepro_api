const Product = require("../../models/Product");

const ProductController = {
  async createProduct(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      const data = { username: user_id, ...bodyData };

      const newProduct = await Product.create(data);
      await newProduct.populate("username").execPopulate();

      return res
        .status(200)
        .json({ newProduct, msg: "Produto criado com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserProducts(req, res) {
    const { user_id } = req.params;

    try {
      const productsOfAnUser = await Product.find({ username: user_id });
      return res
        .status(200)
        .json({ productsOfAnUser, msg: "Aqui está os produtos do usuário." });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async updateProduct(req, res) {
    const bodyData = req.body;
    const { product_id } = req.params;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        product_id,
        bodyData,
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ updatedProduct, msg: "Produto atualizado com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async deleteProduct(req, res) {
    const { product_id } = req.params;

    try {
      const deletedProduct = await Product.findByIdAndDelete(product_id);
      return res
        .status(200)
        .json({ deletedProduct, msg: "Produto removido com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getProductById(req, res) {
    const { product_id } = req.params;

    try {
      const product = await Product.findById(product_id);
      return res
        .status(200)
        .json({ product, msg: "Aqui está as informações do produto." });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async updateProduct(req, res) {
    const bodyData = req.body;
    const { product_id } = req.params;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        product_id,
        bodyData,
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json({ updatedProduct, msg: "Produto atualizado!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};

module.exports = ProductController;
