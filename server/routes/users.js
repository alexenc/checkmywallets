const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//Create an user
//api/users
router.post(
  "/",
  [
    check("username", "name is required").not().isEmpty(),
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

router.get("/", userController.getUsers);

router.get("/:id", userController.getSingleUser);

router.delete("/:id", auth, userController.deleteUser);
module.exports = router;
