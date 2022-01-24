const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');

if (!process.env.ENV) {
  require('dotenv').config();
}

/**
 * Configs
 */
const port = process.env.PORT || 3001;

/**
 * Middleware
 */
app.use(morgan('combined'));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true, limit: '500MB' }));
app.use(bodyParser.json({ limit: '500MB' }));

/**
 * Routes
 */
app.use(require('./src/routes'))

app.listen(port, () => {
  console.log(`server run in port:`, process.env.PORT)
});