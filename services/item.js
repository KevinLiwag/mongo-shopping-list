var Item = require('../models/item');

//add items from db
exports.save = function(name, callback, errback) {
	Item.create({ name: name}, function(err, item) {
		if (err) {
			errback(err);
			return;
		}
		callback(item);
	});
};

//fetch items from db
exports.list = function(callback, errback) {
	Item.find(function(err, items){
		if (err) {
			errback(err);
			return;
		}
		callback(items);
	});
};

//update item from db
exports.update = function(name, callback, errback) {
	Item.findOneAndUpdate({name: name}, function(err, item){
		if (err || !item) {
			console.error("Could not update item", name);
		}
		callback(item);
	});
};