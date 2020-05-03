const db = require('../db');
const Product = require('../models/product.model');

module.exports.index = async (req, res) => {
	/*let page = parseInt(req.query.page) || 1;
	let perPage = 16;
	let start = (page - 1) * perPage;
	let end = page * perPage;
	products = db.get('products').value();
	productsInPage = products.slice(start, end);
	blocksProduct = chunkArray(productsInPage, 4);
	res.render('products/product', {
		blocksProduct: blocksProduct
	});*/
	let products = await Product.find();
	res.render('products/product', {
		products: products
	});
};

module.exports.search = async (req, res) => {
	/*let q = req.query.q;
	let matchNameProducts = db.get('products').value().filter((product) => {
		return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	let page = parseInt(req.query.page) || 1;
	let perPage = 16;
	let start = (page - 1) * perPage;
	let end = page * perPage;
	res.render('products/product', {
		products: matchNameProducts.slice(start, end)
	});*/
	let products = await Product.find();
	res.render('products/product', {
		products: products
	});
};

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size) {
	var index = 0;
	var arrayLength = myArray.length;
	var tempArray = [];

	for (index = 0; index < arrayLength; index += chunk_size) {
		myChunk = myArray.slice(index, index + chunk_size);
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}
// Split in group of 3 items
