const BaseController = require('./BaseController');
const { KnexPool } = require('./../helpers/knex');
const { Model: TxModel } = require('./../models/TransactionsModel');

class TxController extends BaseController {
  constructor() {
    super({ model: TxModel, knex: KnexPool, prefix: 'transactions' })
    this.orderBy = 'block_num';
  }

  async getByIdAddress(req, res, next) {
    let addressId = req.params.id;
    try {
      let result = await this.extendedQuery({ defaultEager: true, orderBy: 'block_num' })
        .where("caller", addressId)
        .page(req.query.page, req.query.page_size)
      
      // response req
      res.status(200).json({
        success: true,
        data: result.results,
        page: {
          total: result.total,
          page: req.query.page,
          page_size: req.query.page_size
        },
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
