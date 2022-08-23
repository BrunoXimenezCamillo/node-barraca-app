const Category = require("../Models/Category");
const yup = require('yup')


class Category_Controller {
    async getCategories(req, res) {
        var data = await Category.find();
        return res.status(200).json({ data });
    }

    async createCategory(req, res) {
        var schema = yup.object().shape({
            name: yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: 'Invalid data'
            })
        }

        var { data } = req.body;

        Category.create(data, err => err ?
            res.status(400).json({ error: true, message: "Failed to register category" }) :
            res.status(200).json({ error: false, message: "Sucess to register category" }));

    }
}

module.exports = new Category_Controller();