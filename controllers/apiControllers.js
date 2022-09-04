const USER = require("./../models/userModel");
const PATIENTS = require("./../models/patientModel");
const password = require("./passwordHasher");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await USER.find();

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      err,
    });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    let newUser = req.body;
    newUser.password = await password.hash(newUser.password);

    newUser = await USER.create(newUser);

    res.status(201).json({
      status: "Success",
      message: "User Created Successfully",
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: {
        err,
      },
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await USER.findById(req.params.id);
    req.session.username = user.email;
    req.session.loggedin = true;
    console.log(req.session);
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    // console.log(err)
    res.status(404).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await PATIENTS.find();
    res.status(200).json({
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const patient = await PATIENTS.findById(req.params.id);
    res.status(200).json({
      patient,
    });
  } catch (err) {
    res.status(404).json({
      err,
    });
  }
};

exports.createPatient = async (req, res) => {
  try {
    await PATIENTS.create(req.body);

    res.redirect("/user/home");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err,
    });
  }
};
