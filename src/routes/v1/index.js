const express = require('express');
const _ = require('lodash');
const router = express.Router();

/**
 * Controller
 */
const BlocksController = require('./../../controller/BlocksController').controller;
const TxController = require('./../../controller/TxController').controller;
const ContractsController = require('./../../controller/ContractsController').controller;
const TokensController = require('./../../controller/TokensController').controller;

/**
 * Init Controller
  */
const types = [
  { name: 'block', controller: BlocksController },
  { name: 'tx', controller: TxController },
  { name: 'contract', controller: ContractsController },
  { name: 'token', controller: TokensController },
]


router.use((req, res, next) => {
  let fileController = types.find(type => type.name == _.head(_.words(req.path, /[^/]+/g)));
  let controller = _.get(fileController, 'controller', undefined);
  if(controller) {
    req.controller = new controller();
    return next();
  }
  return res.status(404).json({
    "success": false,
    "message": "The requested resource could not be found",
    "messageDetail": null
  });
})


/**
 * Routes
*/
router.get('/block/latest', (req, res) => req.controller.getLasted(req, res));
router.get('/block/:id', (req, res) => req.controller.getById(req, res));
router.get('/block/producer/:id', (req, res) => req.controller.getByIdProducer(req, res));

router.get('/tx/latest', (req, res) => req.controller.getLasted(req, res));
router.get('/tx/:id', (req, res) => req.controller.getById(req, res));
router.get('/tx/address/:id', (req, res) => req.controller.getByIdAddress(req, res));

router.get('/token/holders/:id', (req, res) => req.controller.getHolders(req, res));
router.get('/token/transactions/:id', (req, res) => req.controller.getTransfersByAddress(req, res));


module.exports = router;
