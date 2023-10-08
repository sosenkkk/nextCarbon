const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: Number,
    },
  ],
  total:{
    totalPrice:{
      type: Number,
      required: true,
    },
    totalQuantity:{
      type: Number,
      required: true,
    }
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    shippingAddress:{
      type: String,
      required: true,
    },
    landmark:{
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    state:{
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    pincode:{
      type: Number,
      required: true,
    },
    phoneNumber:{
      type: Number,
      required: true,
    },
  },
}, {timestamps:true});

module.exports = mongoose.model("Order", orderSchema);
