const mongoose = require('mongoose');

Product = mongoose.Schema(
    {
        name: { type: 'String', required: true },
        price: { type: 'String', required: true },
        description: { type: 'String', required: false },
        imgUrl: { type: 'String', required: false },
        type: { type: 'String', required: true },
        keywords: [{type:'String', required: false}]
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('product', Product);