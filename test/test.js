// JavaScript File

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

//describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/index')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
//});

it('exists', function(done) {
    chai.request(app)
      .get('/add-delete.html')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
