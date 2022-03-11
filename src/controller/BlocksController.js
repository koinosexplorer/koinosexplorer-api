const BaseController = require('./BaseController');
const { KnexPool } = require('./../helpers/knex');
const { Model: BlocksModel } = require('./../models/BlocksModel');

class BlocksController extends BaseController {
  constructor() {
    super({ model: BlocksModel, knex: KnexPool, prefix: 'block' })
    this.orderBy = 'block_num';
  }

  async getByIdAddress(req, res, next) {
    let addressId = req.params.id;
    try {
      let result = await this.extendedQuery({ defaultEager: true }).where("producer", addressId);
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
  controller: BlocksController
};
