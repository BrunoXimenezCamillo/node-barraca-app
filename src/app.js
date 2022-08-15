//===================
// IMPORTS
//===================

const express = require('express');
const cors = require('cors');
const routes = require('./routes')
require('./config/connection')
const morgan = require('morgan')

//===================
// APP 
//===================


class App{
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'))
        this.app.use((req, res, next) => {
            res.header("Access-Controll-Allow-Origin", "*");
            res.header("Acess-Controll-Allow-Methods", "Get,POST,PUT,DELETE");
            res.header("Acess-Controll-Allow-Headers", "Access", "Content-type", "Auth", "Origin", "X-Requested-With");
            this.app.use(cors());
            next();
        })
    }

    routes() {
        this.app.use(routes);
    }
    
}

//===================
// EXPORTS 
//===================


module.exports = new App().app;