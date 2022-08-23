const Category = require("../Models/Category");


class Category_Controller {
    async getCategories(req, res) {
        var data = await Category.find();
        return res.status(200).json({ data });
    }
}

module.exports = new Category_Controller();