const Wallet = require("../models/Wallet");
const { validationResult } = require("express-validator");

exports.createWallet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const wallet = new Wallet(req.body);
    wallet.owner = req.user.id;
    wallet.save();
    res.json({ wallet });
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

exports.getUserWallets = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const ownerg = req.params.id;

  try {
    let wallet = await Wallet.find({ owner: ownerg });
    res.json(wallet);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

exports.updateWallet = async (req, res) => {
  const { direction, type } = req.body;
  try {
    let wallet = await Wallet.findById(req.params.id);
    if (!wallet) {
      return res.status(404).json({ msg: "wallet does not exist" });
    }

    const newWallet = {};

    newWallet.direction = direction;
    newWallet.type = type;

    wallet = await Wallet.findOneAndUpdate({ _id: req.params.id }, newWallet);
    res.json({ wallet });
  } catch (error) {
    console.log(error);
    res.status(500).send("there was an error");
  }
};

exports.deleteWallet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let wallet = await Wallet.findById(req.params.id);

    if (!wallet) {
      return res.status(404).json({ msg: "404 not found" });
    }
    await Wallet.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "wallet deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("there was an error");
  }
};
