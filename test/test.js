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
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/instruments')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.instruments.should.be.instanceof('Array');
            });
            done();
    });
    
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/instruments/0008')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.model.should.equal('M40 HMI Fresnel');
                res.body.company.should.equal('Arri Lighting Inc.');
                res.body.loc.should.equal('Storage');
            });
            done();
    });
    

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/instruments')
            .send({"model": "10K",
                   "company": "ETC",
                   "loc": "Beach volleyball",
            })
            .end(function(err, res) {
                console.log(err);
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('itemNum');
                res.body.model.should.be.a('string');
                res.body.company.should.be.a('string');
                res.body.loc.should.be.a('string');
                res.body.should.have.property('partNumber');
            });
            done();
    });
    
    it('should edit an item on PUT', function(done) {
        chai.request(app)
            .put('/instruments/0003')
            .send({"model": "10K",
                   "company": "ETC",
                  "loc": "Studio",})
            .end(function(err, res) {
                console.log(err);
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('itemNum');
                res.body.model.should.be.a('string');
                res.body.company.should.be.a('string');
                res.body.loc.should.be.a('string');
                res.body.should.have.property('partNumber');
            });
            done();
    });
    
    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/instruments/0010')
            .send({'itemNum': 8})
            .end(function(err,res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('location');
                res.body.should.have.property('itemNum');
                res.body.should.have.property('company');
                res.body.itemNum.should.be.a('number');
                res.body.model.should.equal('M40 HMI Fresnel');
            }); 
            done();
    });
});