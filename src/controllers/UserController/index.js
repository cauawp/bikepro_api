const User = require("../../models/User");

const UserController = {
  async createUser(req, res) {
    const bodyData = req.body;

    try {
      const newUser = await User.create({
        bodyData,
        msg: "Usuário criado com sucesso!",
      });
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserById(req, res) {
    const { user_id } = req.params;

    try {
      const user = await User.findById(user_id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateUser(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(user_id, bodyData, {
        new: true,
      });

      return res
        .status(200)
        .json({ updatedUser, msg: "Usuário atualizado com sucesso!" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async deleteUser(req, res) {
    const { user_id } = req.params;

    try {
      const deletedUser = await User.findByIdAndDelete(user_id);
      return res
        .status(200)
        .json({ deletedUser, msg: "Usuário deletado com sucesso!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};

module.exports = UserController;
