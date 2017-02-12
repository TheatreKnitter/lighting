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
      .get('/index.html')
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


describe('instrument', function() {
    /*it('should list items on GET', function(done) {
        chai.request(app)
            .post('/instruments')
            .send({'id': '0008'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('number');
                res.body.should.have.property('type');
                res.body.manufacturer.should.be.a('string');
                res.body.id.should.be.a('number');
                done();
            });
    });*/
    
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/instruments')
            .send({"model": "10K",
                   "company": "ETC",
                  "loc": "Beach volleyball",})
            .end(function(err, res) {
                console.log(err);
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.model.should.be.a('string');
                res.body.company.should.be.a('string');
                res.body.loc.should.be.a('string');
                res.body.should.have.property('partNumber');
                done();
            });
    });
});