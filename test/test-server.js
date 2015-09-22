var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

var ID = {};

describe('Shopping List', function() {
	before(function(done){
		seed.run(function() {

				
			Item.findOne({'name': 'Tomatoes'}, function(err, item){
				if (err) return err;

				ID = item._id;
				typeof ID;
			});

			done();
		});
	});
	it('should list items on GET', function(done){
		chai.request(app)
			.get('/items')
			.end(function(err, res){
				should.equal(err, null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.should.have.length(3);
				res.body[0].should.be.a('object');
				res.body[0].should.have.property('_id');
				res.body[0].should.have.property('name');
				res.body[0]._id.should.be.a('string');
				res.body[0].name.should.be.a('string');
				res.body[0].name.should.equal('Broad beans');
				res.body[1].name.should.equal('Tomatoes');
				res.body[2].name.should.equal('Peppers');
				done();
			});
	});

	it('should add an item on POST', function(done){
		chai.request(app)
			.post('/items')
			.send({'name' : 'Kale'})
			.end(function(err, res){
				should.equal(err, null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('name');
				res.body.should.have.property('_id');
				res.body.name.should.be.a('string');
				res.body._id.should.be.a('string');
				res.body.name.should.equal('Kale');
				//It should test what's on the MongoDB side
				Item.findById(res.body._id, function(err, foundItem){
					should.equal(err, null);
					foundItem.should.be.a('object');
					foundItem.should.have.property('_id');
					foundItem.should.have.property('name');
					foundItem._id.should.be.a('object');
					foundItem.name.should.be.a('string');
					foundItem.name.should.equal('Kale');
				});
				
				done();
			});
	});
	it('should edit an item on PUT', function(done){
		chai.request(app)
			.put('/items/' + ID)
			.send({'name' : 'Spinach'})
			.end(function(err, res){
				should.equal(err, null);
				res.should.have.status(202);
				//It should test what's on the MongoDB side
				Item.findById(res.body._id, function(err, foundItem){
					should.equal(err, null);
					foundItem.should.be.a('object');
					foundItem.should.have.property('_id');
					foundItem.should.have.property('name');
					foundItem._id.should.be.a('object');
					foundItem.name.should.be.a('string');
					foundItem.name.should.equal('Spinach');
				});
								
				done();
			});
	});
	it('should delete an item on DELETE', function(done){
		chai.request(app)
			.delete('/items/' + ID)
			.end(function(err, res){
				should.equal(err, null);
				res.should.have.status(200);
				done();
			});
	});
	
	
	after(function(done){
		Item.remove(function() {
			done();
		});
	});
});