class BaseController {
  constructor({ model, knex }) {
    this.model = model.bindKnex(this.knex)
  }
  singleQuery() {
    return this.model.query()
  }
  get_lasted(req, res) {

  }
}

module.exports = BaseController;