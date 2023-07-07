const Feedback = require("../../models/Feedback");

const FeedbackController = {
  async createFeedback(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;
    const { product_id } = req.params;

    try {
      const data = { username: user_id, ...bodyData, product: product_id };

      const createdFeedback = await create(data);
      await createdFeedback.populate("username").execPopulate();
      await createdFeedback.populate("product").execPopulate();

      return res
        .status(200)
        .json({ createdFeedback, msg: "Avaliação feita com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserFeedbacks(req, res) {
    const { user_id } = req.params;

    try {
      const userFeedbacks = await find({ username: user_id }).populate(
        "username"
      );

      return res
        .status(200)
        .json({ userFeedbacks, msg: "Todas avaliações do usuário!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getFeedbacks(req, res) {
    const { feedback_id } = req.params;

    try {
      const feedbacks = await find(feedback_id).populate("username");
      return res
        .status(200)
        .json({ feedbacks, msg: "Todas as avaliações do produto!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async deleteFeedback(req, res) {
    const { feedback_id } = req.params;

    try {
      const deletedFeedback = await findByIdAndDelete(feedback_id);
      return res
        .status(200)
        .json({ deletedFeedback, msg: "Avaliação removida com sucesso!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};

module.exports = FeedbackController;
