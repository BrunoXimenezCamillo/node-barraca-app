const mongoose = require('mongoose')



class Connection {

    constructor() {
        this.dataBaseConnectionMongoDB();
    };

    dataBaseConnectionMongoDB() {
        this.mongoDBConnection = mongoose.connect('mongodb+srv://admin:admin@cluster0.wb4bu.mongodb.net/?retryWrites=true&w=majority', {
        }).then(() => {
            console.log('Connect Succeful')
        }).catch((error) => {
            console.log(`Error connecting to mongoDB: ${error}`);
        })
    };
};

module.exports = new Connection();