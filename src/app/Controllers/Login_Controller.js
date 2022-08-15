const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');


class Login_Controller {

    async index(req, res) {
        const { email, password } = req.body;
        const userExist =  await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                error: true,
                message: "User does not exist"
            })
        }

        if (!(await bcrypt.compare(password, userExist.password))){
            return res.status(400).json({
                error: true,
                message: "Incorrect password"
            })

        }



        return await res.status(200).json({
            user:
            {
                name: userExist.name,
                email:userExist.email
            },
            token: jwt.sign(
                {id:userExist._id},
                config.secret,
                {expiresIn:config.expireIn}
            )
        })

    }


}


module.exports = new Login_Controller();