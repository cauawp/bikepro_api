const { Router } = require("express");

const UserController = require("../controllers/UserController");
const SessionController = require("../controllers/Login");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");
const FeedbackController = require("../controllers/FeedbackController");
const FavoriteController = require("../controllers/FavoriteController");

const { authenticate } = require("../middlewares");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello, World!");
});

routes.post("/users", UserController.createUser);
routes.get("/users", UserController.getUsers);
routes.get("/users/:user_id", UserController.getUserById);
routes.patch("/users/:user_id", authenticate, UserController.updateUser);
routes.delete("/users/:user_id", authenticate, UserController.deleteUser);

routes.post("/sessions", SessionController.createSession);

routes.post(
  "/products/:user_id",
  authenticate,
  ProductController.createProduct
);
routes.get("/:user_id/products", ProductController.getUserProducts);
routes.patch(
  "/products/:user_id/:product_id",
  authenticate,
  ProductController.updateProduct
);
routes.delete(
  "/products/:user_id/:product_id",
  authenticate,
  ProductController.deleteProduct
);

routes.get("/products", ProductController.getProducts);
routes.get("/products/:product_id", ProductController.getProductById);

routes.post("/carts/:user_id", authenticate, CartController.createCart);
routes.get("/carts/:user_id", authenticate, CartController.getUserCarts);
routes.get("/carts/:user_id/:cart_id", authenticate, CartController.getCart);
routes.patch(
  "/carts/:user_id/:cart_id",
  authenticate,
  CartController.updateCart
);

//FEEDBACKS
routes.post(
  "/products/:product_id/feedbacks/:user_id",
  authenticate,
  FeedbackController.createFeedback
);
routes.get(
  "/products/feedbacks/:user_id",
  authenticate,
  FeedbackController.getUserFeedbacks
);
routes.get("/products/:product_id/feedbacks", FeedbackController.getFeedbacks);
routes.delete(
  "/products/:product_id/feedbacks/:user_id/:feedback_id",
  authenticate,
  FeedbackController.deleteFeedback
);

//FAVORITE
routes.post(
  "/products/:product_id/favorites/:user_id",
  authenticate,
  FavoriteController.createFavorite
);

routes.get(
  "/products/:product_id/favorites",
  FavoriteController.getFavoritesProduct
);

routes.patch(
  "/products/:product_id/favorites/:favorite_id/:user_id",
  authenticate,
  FavoriteController.updateFavorite
);

routes.delete(
  "/products/:product_id/favorites/:favorite_id/:user_id",
  authenticate,
  FavoriteController.deleteProductFavorite
);

module.exports = routes;
