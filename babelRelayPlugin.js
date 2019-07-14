/* eslint-disable no-underscore-dangle */
const babelRelayPlugin = require('babel-plugin-relay');

const schemaData = require('./data/schema.json').data;

module.exports = babelRelayPlugin(schemaData, {
    abortOnError: true
});