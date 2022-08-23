const mongoose = require('mongoose');

Category = mongoose.Schema(
    {
        name: { type: 'String', required: true },
    }
)



module.exports = mongoose.model('category', Category);