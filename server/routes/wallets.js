const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//Create a wallet
//api/wallets
router.post(
  "/",
  auth,
  [
    check("direction", "direction is required").not().isEmpty(),
    check("type", "wallet type is required").not().isEmpty(),
  ],
  walletController.createWallet
);

router.get(
  "/:id",

  walletController.getUserWallets
);

router.put(
  "/:id",
  auth,
  [
    check("direction", "direction is required").not().isEmpty(),
    check("type", "wallet type is required").not().isEmpty(),
  ],
  walletController.updateWallet
);

router.delete("/:id", auth, walletController.deleteWallet);

module.exports = router;
