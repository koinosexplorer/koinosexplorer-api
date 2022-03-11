const BaseController = require('./BaseController');
const { KnexPool } = require('./../helpers/knex');
const { Model: TxModel } = require('./../models/TransactionsModel');

class TxController extends BaseController {
  constructor() {
    super({ model: TxModel, knex: KnexPool, prefix: 'transactions' })
  }

  async getByIdAddress(req, res, next) {
    let addressId = req.params.id;
    try {
      let result = await this.extendedQuery({ defaultEager: true }).where("payer", addressId);
      // response req
      res.status(200).json({
        success: true,
        data: result,
        message: null
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error in address"
      })
    }
  }


}

module.exports = {
  controller: TxController
};
