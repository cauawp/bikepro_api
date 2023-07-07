const Cart = require("../../models/Cart");

const CartController = {
  async createCart(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      const createdCart = await Cart.create({ ...bodyData, username: user_id });
      await createdCart.populate("products username").execPopulate();

      return res
        .status(200)
        .json({ createdCart, msg: "Produto adicionado ao carrinho!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserCarts(req, res) {
    try {
      const userCarts = await Cart.find().populate("products username");
      return res.status(200).json(userCarts); //, msg: 'Informações dos carrinhos'}
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getCart(req, res) {
    const { cart_id } = req.params;

    try {
      const cart = await Cart.findById(cart_id).populate("products username");
      return res.status(200).json({ cart, msg: "Informações do carrinho." });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async updateCart(req, res) {
    const bodyData = req.body;
    const { cart_id } = req.params;

    try {
      const updatedCart = await Cart.findByIdAndUpdate(cart_id, bodyData, {
        new: true,
      });
      await updatedCart.populate("products username").execPopulate();

      return res
        .status(200)
        .json({ updatedCart, msg: "Carrinho atualizado com sucesso" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async deleteProductCart(req, res) {
    const { cart_id } = req.params;

    try {
      const deletedProduct = await Cart.findByIdAndDelete(
        cart_id,
        { $pull: { friends: friendId } },
        { new: true }
      );
      await deletedProduct.populate("products username").execPopulate();

      return res
        .status(200)
        .json({ deletedProduct, msg: "Produto excluído com sucecsso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};

module.exports = CartController;
