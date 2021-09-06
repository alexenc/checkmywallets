const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    //PRESAVE PARA HASEAR LA PASSWORD ANTES DE METERLA EN LA BASE DE DATOS
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: function () {
      return `https://avatars.dicebear.com/api/identicon/${this.username}.svg`;
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
