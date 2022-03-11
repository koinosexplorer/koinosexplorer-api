const BaseController = require('./BaseController');
const { KnexPool } = require('./../helpers/knex');
const { Model: ContractsModel } = require('./../models/ContractsModel');

class ContractsController extends BaseController {
  constructor() {
    super({ model: ContractsModel, knex: KnexPool, prefix: 'contracts' })
  }
}

module.exports = {
  controller: ContractsController
};
