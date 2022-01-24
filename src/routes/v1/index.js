const express = require('express');
const router = express.Router();

/**
 * Controller
 */
const BlocksController = require('./../../controller/BlocksController').controller
const TxController = require('./../../controller/TxController').controller
const ContractsController = require('./../../controller/ContractsController').controller

/**
 * Routes
 */

router.get('/blocks', () => {
  let controller = new BlocksController();
  controller.http
})

module.exports = router;
