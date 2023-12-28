const Cart = require("../../models/Cart");

const CartController = {
  /*async createCart(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      const createdCart = await Cart.create({ ...bodyData, username: user_id });
      await createdCart.populate("products.product username").execPopulate();

      return res
        .status(200)
        .json({ createdCart, msg: "Produto adicionado ao carrinho!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },*/

  async createCart(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      let cart = await Cart.findOne({ username: user_id });

      if (!cart) {
        cart = await Cart.create({ ...bodyData, username: user_id });
      } else {
        const newProduct = bodyData.products[0];

        const existingProduct = cart.products.find(
          (product) =>
            product.product.toString() === newProduct.product &&
            product.productColor === newProduct.productColor &&
            product.productSize === newProduct.productSize
        );

        if (existingProduct) {
          existingProduct.productQuantity =
            (existingProduct.productQuantity || 0) + 1;
        } else {
          newProduct.productQuantity = newProduct.productQuantity || 1;
          cart.products.push(newProduct);
        }

        await cart.save();
      }

      await cart.populate("products.product username").execPopulate();

      return res
        .status(200)
        .json({ cart, msg: "Produto adicionado ao carrinho!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserCarts(req, res) {
    const { user_id } = req.params;

    try {
      const userCart = await Cart.findOne({ username: user_id }).populate(
        "products.product username"
      );

      return res.status(200).json(userCart);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getCart(req, res) {
    const { cart_id } = req.params;

    try {
      const cart = await Cart.findById(cart_id).populate(
        "products.product username"
      );
      return res.status(200).json({ cart, msg: "Informações do carrinho." });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  /*async updateQuantity(req, res) {
    const { user_id } = req.params;
    const { productIdentifier, productQuantity } = req.body;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { username: user_id, "products.productIdentifier": productIdentifier },
        { $set: { "products.$.productQuantity": productQuantity } },
        { new: true }
      );

      if (!updatedCart) {
        return res
          .status(404)
          .json({ error: "Produto não encontrado no carrinho" });
      }

      return res.status(200).json({
        updatedCart,
        msg: "Quantidade do produto atualizada com sucesso",
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async updateCart(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;
    const { cart_id } = req.params;

    try {
      const updatedCart = await Cart.findByIdAndUpdate({ cart_id }, bodyData, {
        new: true,
      });

      return res
        .status(200)
        .json({ updatedCart, msg: "Carrinho atualizado com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  */

  async updateCart(req, res) {
    const { user_id } = req.params;
    const { productIdentifier, productQuantity, ...bodyData } = req.body;

    try {
      if (productIdentifier && productQuantity) {
        const updatedCart = await Cart.findOneAndUpdate(
          {
            username: user_id,
            "products.productIdentifier": productIdentifier,
          },
          { $set: { "products.$.productQuantity": productQuantity } },
          { new: true }
        );

        if (!updatedCart) {
          return res
            .status(404)
            .json({ error: "Produto não encontrado no carrinho" });
        }

        return res.status(200).json({
          updatedCart,
          msg: "Quantidade do produto atualizada com sucesso",
        });
      } else {
        const updatedCart = await Cart.findOneAndUpdate(
          { username: user_id },
          bodyData,
          { new: true }
        );

        if (!updatedCart) {
          return res.status(404).json({ error: "Carrinho não encontrado" });
        }

        return res
          .status(200)
          .json({ updatedCart, msg: "Carrinho atualizado com sucesso!" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async deleteProduct(req, res) {
    const { user_id, product_identifier } = req.params;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { username: user_id },
        { $pull: { products: { productIdentifier: product_identifier } } },
        { new: true }
      );

      if (!updatedCart) {
        return res
          .status(404)
          .json({ error: "Produto não encontrado no carrinho" });
      }

      return res.status(200).json({
        updatedCart,
        msg: "Produto removido do carrinho com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao remover o produto do carrinho" });
    }
  },
};

module.exports = CartController;
