/**
 * @name <%= name %>-v1-api
 * @description This module packages the <%= Name %> API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();

const ServerResponse = hydra.getServerResponseHelper();
let serverResponse = new ServerResponse();
<%_ if (cors) { _%>serverResponse.enableCORS(true);<%_ } _%>

express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.get('/',<% if (auth) {%> hydraExpress.validateJwtToken(),<% } %>
(req, res) => {
  res.sendOk({greeting: 'Welcome to Hydra Express!'});
});

module.exports = api;
