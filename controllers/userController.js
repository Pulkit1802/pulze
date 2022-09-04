const USER = require("./../models/userModel");
const PATIENT = require("./../models/patientModel");

module.exports.getUserHome = async (req, res) => {
  try {
    if (req.session.loggedin) {
      const user = await USER.findOne({ email: req.session.username });
      // console.log(user)
      const patients = await PATIENT.find({ assignedTo: req.session.username });

      res.render("pages/userPage.ejs", {
        user: user,
        patients: patients,
      });
    } else res.redirect("/login");
  } catch (err) {
    res.json({});
  }
};

module.exports.getPatient = async (req, res) => {
  let patient = await PATIENT.findById(req.params.id);
  let ctsVals = ["modelAge", "trtbps", "oldpeak", "thalachh"];
  let fixedVals = [
    "ca1",
    "ca2",
    "ca3",
    "restecg",
    "exng",
    "slp",
    "thall",
    "cp",
    "caa",
  ];

  ctsVals.forEach((val) => (patient[val] = Math.random()));
  fixedVals.forEach((val) => (patient[val] = Math.floor(Math.random() * 2)));

  patient = await PATIENT.findByIdAndUpdate(patient.id, patient);

  const value = Math.floor(Math.random() * 2);
  res.render("pages/patient.ejs", {
    patient: patient,
  });
};

exports.createPatient = async (req, res) => {
  try {
    await PATIENT.create(req.body);

    res.redirect("/user/home");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err,
    });
  }
};
