const User = require('../Models/User')
const Product = require('../Models/Product')

const bcrypt = require('bcryptjs')
const yup = require('yup')


class User_Controller {


    async myAccount(req, res) {
        var data = await User.findOne({ _id: req.user_id });
        return  res.status(200).json({ "user": data });
    }

    async createProduct(req, res) {
        var schema = yup.object().shape({
            name: yup.string().required(),
            price: yup.string().required(),
            description: yup.string(),
            imgUrl: yup.string(),
            keywords: yup.array()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: 'Invalid data'
            })
        }
        var { name, price, description, imgUrl, type, keywords } = req.body;
        const data = { name, price, description, imgUrl, type, keywords };

        Product.create(data, err => err ?
            res.status(400).json({ error: true, message: "Failed to register product" }) :
            res.status(200).json({ error: false, message: "Sucess to register product" }));
    }

    async editProduct(req, res) {
        var { _id, name, price, description, imgUrl, type, keywords } = req.body;
        var data = { name, price, description, imgUrl, type, keywords };
        Product.findByIdAndUpdate(_id, data, err => err ?
            res.status(400).json({ error: true, message: "Failed to update product" }) :
            res.status(200).json({ error: false, message: "Sucess to update product" }));
    }

    async deleteProduct(req, res) {
        var { _id } = req.body;
        Product.findByIdAndDelete(_id, err => err ?
            res.status(400).json({ error: true, message: "Failed to delete product" }) :
            res.status(200).json({ error: false, message: "Sucess to delete product" }));

    }

    async store(req, res) {

        //VALIDAÇÃO ATRAVÉS DO YUP SCHEMA

        let schema = yup.object().shape({
            name: yup.string().required(),
            password: yup.string().required(),
            email: yup.string().email().required()

        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: 'Invalid data'
            })
        }
        //VERIFICANDO SE USUÁRIO JÁ EXISTE NO DB

        let userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(400).json({
                error: true,
                message: 'This user already exists'

            })

        }

        //RECEBENDO OS DADOS DO REQUEST

        const { name, email, password } = req.body;
        const data = { name, email, password };


        //CRIPTOGRAFANDO A SENHA

        data.password = await bcrypt.hash(data.password, 8);

        //CRIANDO O USUÁRIO

        await User.create(data, (err) => {
            if (err) {
                return res.status(400).json(
                    {
                        error: true,
                        message: 'Error registering user'
                    }
                )
            }
                return res.status(200).json(
                    {
                        error: false,
                        message:'Registered user'
                    }
                )
            
        })
    }


}




module.exports = new User_Controller();
