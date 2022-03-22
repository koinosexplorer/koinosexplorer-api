const BaseController = require('./BaseController');
const { KnexPool } = require('../helpers/knex');
const { Model: GlobalsModel } = require('../models/GlobalsModel');

class GlobalsController extends BaseController {
  constructor() {
    super({ model: GlobalsModel, knex: KnexPool, prefix: 'globals' })
  }
  async getFull(req, res) {
    try {
      let result = await this.singleQuery();

      // response req
      res.status(200).json({
        success: true,
        data: result,
        page: {
          total: result.total || 0,
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
  controller: GlobalsController
};
