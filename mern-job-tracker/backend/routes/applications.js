const router = require("express").Router();
let Application = require("../models/application.model");

router.route("/").get((req, res) => {
  Application.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const company = req.body.company;
  const position = req.body.position;
  const applicationDate = Date.parse(req.body.applicationDate);
  const salary = Number(req.body.salary);
  const status = req.body.status;
  const jobLink = req.body.jobLink;

  const newApplication = new Application({
    username,
    company,
    position,
    applicationDate,
    salary,
    status,
    jobLink
  });

  newApplication
    .save()
    .then(() => res.json("Application added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Application.findById(req.params.id)
    .then(application => res.json(application))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Application.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Application.findById(req.params.id)
    .then(application => {
      application.username = req.body.username;
      application.company = req.body.company;
      application.position = req.body.position;
      application.applicationDate = Date.parse(req.body.applicationDate);
      application.salary = Number(req.body.salary);
      application.status = req.body.status;
      application.jobLink = req.body.jobLink;

      application
        .save()
        .then(() => res.json("Application updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
