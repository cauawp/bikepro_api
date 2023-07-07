const Favorite = require("../../models/Favorite");

const FavoriteController = {
  async createFavorite(req, res) {
    const bodyData = req.body;
    const { product_id } = req.params;
    const { user_id } = req.params;

    try {
      const data = { username: user_id, ...bodyData, product: product_id };

      const createdFavorite = await Favorite.create(data);
      await createdFavorite.populate("username").execPopulate();
      await createdFavorite.populate("product").execPopulate();

      return res
        .status(200)
        .json({ createdFavorite, msg: "Produto favoritado com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getFavoritesProduct(req, res) {
    try {
      const favoritesProducts = await Favorite.find().populate(
        "product username"
      );

      return res.status(200).json({
        ...favoritesProducts,
        msg: "Aqui está todos favoritos do produto!",
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserFavorites(req, res) {
    try {
      const userFavorites = await Favorite.find().populate("products username");
      return res.status(200).json({
        userFavorites,
        msg: "Aqui está todos os seus produtos favoritados.",
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async updateFavorite(req, res) {
    const bodyData = req.body;
    const { favorite_id } = req.params;

    try {
      const updatedFavorite = await Favorite.findByIdAndUpdate(
        favorite_id,
        bodyData,
        { new: true }
      );
      await updatedFavorite.populate("product username").execPopulate();

      return res
        .status(200)
        .json({ updatedFavorite, msg: "Produto desfavoritado!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async deleteProductFavorite(req, res) {
    const { favorite_id } = req.params;

    try {
      const deletedFavorite = await Favorite.findByIdAndDelete(favorite_id);
      await deletedFavorite.populate("product username").execPopulate();
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
