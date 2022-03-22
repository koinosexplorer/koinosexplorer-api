const _ = require('lodash');
const dot = require('dot-object')

class BaseController {
  constructor({ model, knex, prefix }) {
    this.knex = knex;
    this.model = model.bindKnex(this.knex);
    this.prefix = prefix;

    this.orderBy = null;
    this.byId = null;
  }
  /**
   * Statis method
   */
   static _flatten(obj) {
    if (_.isEmpty(obj)) {
      return [];
    }
    let arr = []
    _.forIn(obj, (value, key) => {
      let r = BaseController._flatten(value)
      arr.push(r == '' ? key : `${key}.[${r}]`)
    })
    return arr;
  }  


  /**
   * Query Configs
   */
  singleQuery(buildOpts = { query: {} }) {
    return this.model.query()
  }
  relationSingleQuery(relation) {
    return this.model.relatedQuery(relation);
  }

  baseQuery(buildOpts = {}) {
    let baseQuery = this.singleQuery(buildOpts);
    let leftJoin = _.pickBy(this.model.relationMappings, (relation, name) => {
      return relation.hasOwnProperty('single')
    })
    let leftJoin2 = leftJoin
    _.forIn(leftJoin, (value, key) => {
      leftJoin[key] = _.get(value, 'single')
    })
    if (buildOpts.baseQueryModifier) {
      buildOpts.baseQueryModifier(baseQuery);
    }
    baseQuery.leftJoinRelated(`[${BaseController._flatten(leftJoin2).join(',')}]`)
    return baseQuery;
  }

  extendedQuery(buildOpts = { defaultEager: false, eagerList: [], orderBy: null }) {
    let extendedQuery = this.baseQuery(buildOpts);
    if(buildOpts.defaultEager == true) {
      let eager = _.pickBy(this.model.relationMappings, (relation, name) => relation.eager != null)
      _.forIn(eager, (value, key) => {
        eager[key] = _.get(value, 'eager')
      })
      if(!_.isEmpty(eager) || !_.isEmpty(buildOpts.eagerList)) {
        extendedQuery.withGraphFetched(`[${BaseController._flatten(eager).concat(_.defaultTo(buildOpts.eagerList,[])).join(',')}]`)
      }
    }
    if (_.isFunction(buildOpts.queryModifier)) {
      buildOpts.queryModifier(extendedQuery);
    }

    if(buildOpts.orderBy) {
      extendedQuery.orderBy(buildOpts.orderBy, 'desc')
    }
    
    return extendedQuery;
  }


  /**
   * Request Conrollers Global
   */
   async getLasted(req, res, next) {
     try {
      let result = await this.extendedQuery({ defaultEager: true, orderBy: this.orderBy }).page(req.query.page, req.query.page_size)
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
        message: "Error in request"
      })
    }
  }

  async getById(req, res, next) {
    let id = req.params.id;
    try {
      let result = await this.extendedQuery({ defaultEager: true, orderBy: this.orderBy }).findById(id)
      // response req
      res.status(200).json({
        success: true,
        data: result,
        message: null
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error in id"
      })
    }
  }

}

module.exports = BaseController;