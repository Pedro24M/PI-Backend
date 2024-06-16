const router = require("express").Router()

const servicoController = require("../controllers/controller_festa")

router.route("/").post((req, res)=> servicoController.create(req, res))

router.route("/").get((req, res) => servicoController.getAll(req,res))

router.route("/:id").get((req, res) => servicoController.get(req,res))

router.route("/:id").delete((req,res) => servicoController.delete(req,res))

router.route("/:id").put((req, res) => servicoController.update(req,res))

module.exports = router