const router = require("express").Router()

const servicoController = require("../controllers/controller_festa")

router.route("/services").post((req, res)=> servicoController.create(req, res))

router.route("/services").get((req, res) => servicoController.getAll(req,res))

router.route("/services/:id").get((req, res) => servicoController.get(req,res))

router.route("/services/:id").delete((req,res) => servicoController.delete(req,res))

router.route("/services/:id").put((req, res) => servicoController.update(req,res))

module.exports = router