//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
// const express = require("express");
let should = chai.should();
chai.use(chaiHttp);
// const server = express();
let server = require('../../server');
//Export this to use in multiple files
module.exports = {
	chai: chai,
	server: server,
	chaiHttp: chaiHttp,
	should: should
};