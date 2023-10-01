const Favorite = require("../../models/Favorite");

const FavoriteController = {
  async createFavorite(req, res) {
    const { user_id } = req.params;
    const { product_id } = req.params;
    const bodyData = req.body;

    try {
      const existingFavorite = await Favorite.findOne({
        username: user_id,
        product: product_id,
      });

      if (existingFavorite) {
        return res
          .status(400)
          .json({ msg: "Este produto já foi favoritado por este usuário." });
      }

      if (!product_id) {
        return res.status(400).json({ msg: "O ID do produto é obrigatório." });
      }

      const data = { username: user_id, product: product_id, ...bodyData };

      const createdFavorite = await Favorite.create(data);

      return res
        .status(200)
        .json({ createdFavorite, msg: "Produto favoritado com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getFavoritesProduct(req, res) {
    const { product_id } = req.params;

    try {
      const favoritesProducts = await Favorite.find({
        product: product_id,
      }).populate("username");

      return res.status(200).json(favoritesProducts);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getFavoritedProduct(req, res) {
    const { product_id, user_id } = req.params;

    try {
      const favoritedProduct = await Favorite.findOne({
        product: product_id,
        username: user_id,
      }).populate("username");

      return res.status(200).json(favoritedProduct);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserFavorites(req, res) {
    const { user_id } = req.params;

    try {
      const userFavorites = await Favorite.find({ username: user_id }).populate(
        "product"
      );

      return res.status(200).json({
        userFavorites,
        msg: "Aqui estão todos os seus produtos favoritados.",
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async updateFavorite(req, res) {
    const { product_id, user_id } = req.params;
    const bodyData = req.body;

    try {
      const updatedFavorite = await Favorite.findOneAndUpdate(
        { product: product_id, username: user_id },
        bodyData,
        { new: true }
      );

      if (!updatedFavorite) {
        return res.status(404).json({ msg: "Favorito não encontrado" });
      }

      return res
        .status(200)
        .json({ updatedFavorite, msg: "Favorito atualizado" });
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Erro ao atualizar favorito", error: err.message });
    }
  },

  async deleteProductFavorite(req, res) {
    const { favorite_id } = req.params;

    try {
      const deletedFavorite = await Favorite.findByIdAndDelete(
        favorite_id
      ).populate("product username");

      return res
        .status(200)
        .json({ deletedFavorite, msg: "Favorito removido com sucesso!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};

module.exports = FavoriteController;
