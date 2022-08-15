const Product = require('../Models/Product')

class Product_Controller {

    async getProductsByType(req, res) {
        var { query, page, limit } = req.body;
        page = Number(page);
        limit = Number(limit);
        var pages = await Product.find({ type: query }).count();
        pages = Math.ceil(pages / limit);

        var data = await Product.find({ type: query }).skip((page - 1) * limit).limit(limit);
        return res.status(200).json({ data, pages });
    }

    async findProducts(req, res) {
        var { query, page, limit } = req.body;
        page = Number(page);
        limit = Number(limit);
        if (query == "") {
            var pages = await Product.find().count();
            pages = Math.ceil(pages / limit);
            var data = await Product.find().skip((page - 1) * limit).limit(limit);
            return res.status(200).json({ data, pages });
        }

        query = query.split(' ');

        var excludeWords = ['de', 'do', 'da'];
        var toRemove = [];

        query.forEach((word, index) => {
            if (excludeWords.includes(word))
                toRemove.push(index);
        })

        toRemove.forEach(id => query.splice(id,1));
        var pages = await Product.find({ keywords: { $all: query } }).count();
        pages = Math.ceil(pages / limit);
        var data = await Product.find({ keywords: { $all: query } }).skip((page - 1) * limit).limit(limit);

        return res.status(200).json({ data, pages });
    }

    async allProducts(req, res) {
        var { page, limit } = req.body;
        page = Number(page);
        limit = Number(limit);
        var pages = await Product.find().count();
        pages = Math.ceil(pages / limit);
        var data = await Product.find().skip((page - 1) * limit).limit(limit);

        return res.status(200).json({ data, pages });
    }


}

module.exports = new Product_Controller();
