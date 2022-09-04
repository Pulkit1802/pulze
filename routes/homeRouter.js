const express = require("express");
const homeRouter = require("./../controllers/homeController");
const loginController = require("./../controllers/loginController");

const router = express.Router();

router.route("/home").get(homeRouter.getHomePage);

router.route("/about").get(homeRouter.getAboutPage);

router
  .route("/login")
  .get(loginController.getLoginPage)
  .post(loginController.loginUser);

router.route("/addd").get(loginController.getAddPPage);

router
  .route("/signup")
  .get(loginController.getSignupPage)
  .post(loginController.registerUser);

router.route("/logout").get(loginController.logout);

module.exports = router;
