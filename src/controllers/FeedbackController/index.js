const Feedback = require("../../models/Feedback");

const FeedbackController = {
  async createFeedback(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;
    const { product_id } = req.params;

    try {
      const data = { username: user_id, ...bodyData, product: product_id };

      const createdFeedback = await Feedback.create(data);
      await createdFeedback.populate("username").execPopulate();
      await createdFeedback.populate("product").execPopulate();

      return res.status(200).json(createdFeedback); //, msg: "Avaliação feita com sucesso!" }
    } catch (err) {
      return res.status(400).json(err);
    }

    /*const bodyData = req.body
        const { user_id } = req.params

        try {

            const createdFeedback = await Feedback.create({...bodyData, username: user_id})
            await createdFeedback.populate('username').execPopulate()

            return res.status(200).json(createdFeedback)

        } catch(err) {

            return res.status(400).json(err)

        }*/
  },

  async getUserFeedbacks(req, res) {
    const { product_id } = req.params;
    const { user_id } = req.params;

    try {
      const userFeedbacks = await Feedback.find({ username: user_id }).populate(
        "username"
      );

      return res.status(200).json(userFeedbacks); //, msg: 'Aqui está todos Feedbacks do usuário'}
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getFeedbacks(req, res) {
    const { user_id, feedback_id } = req.params;

    try {
      /*const feedback = await Feedback.findById(feedback_id).populate('products')
            return res.status(200).json(feedback)*/

      const feedbacks = await Feedback.find(feedback_id).populate("username");
      return res.status(200).json(feedbacks); //, msg: 'Aqui está os Feedbacks do produto!'}
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async deleteFeedback(req, res) {
    const { user_id, feedback_id, product_id } = req.params;

    try {
      const deletedFeedback = await Feedback.findByIdAndDelete(feedback_id);
      return res.status(200).json(deletedFeedback);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};

module.exports = FeedbackController;
