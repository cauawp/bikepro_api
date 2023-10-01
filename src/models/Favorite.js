const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    /*product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },*/
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    favorited: {
      type: Boolean,
      required: false,
    },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", Schema);
