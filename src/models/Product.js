const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productColors: {
      type: Object,
      required: true,
    },
    productSpec: {
      type: Array,
      required: false,
    },
    productLastPrice: {
      type: String,
      required: false,
    },
    productPrice: {
      type: String,
      required: true,
    },
    productImgsDemo: {
      type: Object,
      required: false,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Schema);
