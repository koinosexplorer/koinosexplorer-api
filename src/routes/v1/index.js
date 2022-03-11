const express = require('express');
const _ = require('lodash');
const router = express.Router();

/**
 * Controller
 */
const BlocksController = require('./../../controller/BlocksController').controller;
const TxController = require('./../../controller/TxController').controller;
const ContractsController = require('./../../controller/ContractsController').controller;

/**
 * Init Controller
  */
const types = [
  { name: 'block', controller: BlocksController },
  { name: 'tx', controller: TxController },
  { name: 'contract', controller: ContractsController },
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
router.get('/block/address/:id', (req, res) => req.controller.getByIdAddress(req, res));

router.get('/tx/latest', (req, res) => req.controller.getLasted(req, res));
router.get('/tx/:id', (req, res) => req.controller.getById(req, res));
router.get('/tx/address/:id', (req, res) => req.controller.getByIdAddress(req, res));



module.exports = router;
