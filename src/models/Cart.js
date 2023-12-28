const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      productSize: {
        type: String,
        required: true,
      },
      productQuantity: {
        type: Number,
        required: false,
      },
      productColor: {
        type: String,
        required: true,
      },
      productIdentifier: {
        type: String,
        required: true,
        default: uuidv4,
      },
    },
  ],
  username: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  address: {
    street: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
  valueTotal: {
    type: Number,
    required: false,
  },
  cep: {
    type: Number,
    required: false,
  },
  payment: {
    card: {
      number: {
        type: String,
      },
      cvc: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("Cart", Schema);
