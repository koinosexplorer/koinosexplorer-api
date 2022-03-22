const BaseController = require('./BaseController');
const { KnexPool } = require('../helpers/knex');
const { Model: TokensModel } = require('../models/TokensModel');
const { Model: TokensHolders } = require('../models/TokensHolders');
const { Model: TokensTransactionModel } = require('../models/TokensTransactionModel');
const _ = require('lodash');

class TokensController extends BaseController {
  constructor() {
    super({ model: TokensModel, knex: KnexPool, prefix: 'tokens' })

    // tables not models
    this.tokenTx = TokensTransactionModel.bindKnex(KnexPool);
    this.tokenHolders = TokensHolders.bindKnex(KnexPool);
  }

  async getHolders(req, res, next) {
    let token_id = req.params.id;

    try {
      let result = await this.tokenHolders.query() // this.relationSingleQuery("tokens_holders")
        .where("token_id", token_id)
        .orderBy("amount", "desc")
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
      console.log(error)
      res.status(400).json({
        success: false,
        message: "Error in address"
      })
    }
  }

  async getTransfersByAddress(req, res, next) {
    let addressId = req.params.id;

    try {
      let result = await this.tokenTx.query()
        .where("from", addressId)
        .orWhere("to", addressId)
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
      console.log(error)
      res.status(400).json({
        success: false,
        message: "Error in address"
      })
    }
  }

}

module.exports = {
  controller: TokensController
};
