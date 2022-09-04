const USER = require("./../models/userModel");
const password = require("./passwordHasher");

module.exports.getSignupPage = (req, res) => {
  res.render("pages/signup.ejs");
};

module.exports.getLoginPage = (req, res) => {
  res.render("pages/login.ejs");
};

module.exports.getAddPPage = (req, res) => {
  res.render("pages/patientAdd.ejs");
};
module.exports.registerUser = async (req, res) => {
  try {
    let newUser = req.body;
    newUser.password = await password.hash(newUser.password);
    await USER.create(newUser);

    res.redirect("/home");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: {
        err,
      },
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const user = await USER.findOne({ email: req.body.email });
    const valid = await password.validate(user.password, req.body.password);

    req.session.loggedin = true;
    req.session.username = user.email;

    if (valid) {
      res.redirect("/user/home/");
    } else {
      res.status(404).json({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: {
        err,
      },
    });
  }
};

module.exports.logout = (req, res) => {
  req.session.loggedin = false;
  req.session.username = null;
  res.redirect("/home");
};
