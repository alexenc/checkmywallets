const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  direction: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    enum: [],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
