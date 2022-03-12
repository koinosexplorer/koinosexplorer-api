const BaseController = require('./BaseController');
const { KnexPool } = require('./../helpers/knex');
const { Model: BlocksModel } = require('./../models/BlocksModel');
const _ = require('lodash');

class BlocksController extends BaseController {
  constructor() {
    super({ model: BlocksModel, knex: KnexPool, prefix: 'block' })
    this.orderBy = 'block_num';
  }

  async getByIdProducer(req, res, next) {
    let addressId = req.params.id;

    try {
      let result = await this.extendedQuery({ defaultEager: true, orderBy: 'block_num' })
        .where("producer", addressId)
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
  controller: BlocksController
};
