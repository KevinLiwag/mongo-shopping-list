var Item = require('../models/item');

//add items from db
exports.save = function(name, callback) {
	Item.create({ name: name}, function(err, item) {
		return callback(err, item);
	});
};

//fetch items from db
exports.list = function(callback) {
	Item.find(function(err, items){		
		return callback(err, items);
	});
};

//update item from db
exports.update = function(name, callback) {
	Item.findOneAndUpdate(id, {"name": name}, function(err, item){
		return callback(err, item);
	});
};

//delete item from db
exports.delete = function(id, callback) {
	Item.findAndRemove(id, function(err, result) {
		return callback(err, result);
	};
};
