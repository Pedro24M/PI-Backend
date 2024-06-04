const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

const swaggerDocument = YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8'));

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
