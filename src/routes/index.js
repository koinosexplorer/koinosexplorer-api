const express = require('express');
const router = express.Router();
const { all_catch } = require('./catch');
const _ = require('lodash');

//  routes
router.use((req, res, next) => {
  if (req.method.toUpperCase() == 'GET') {
    req.query.page = _.defaultTo(Number.parseInt(req.query.page), undefined) ? Number.parseInt(req.query.page) : 0;
    req.query.page_size = _.defaultTo(Number.parseInt(req.query.page_size), undefined) ? Number.parseInt(req.query.page_size) : 100;
  }
  next()
})

router.use('/v1', require('./v1'))
router.use(all_catch)

module.exports = router;