const router = require("express").Router()

// Servico Rotas
const servicoRouter = require("./servico")

router.use("/", servicoRouter)

module.exports = router;