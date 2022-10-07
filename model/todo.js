const mongoose = require('mongoose')

// for structure
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    author: {
        type: String,
        require: true
    }

    
   
},
{
    timestamps: true
})





// create a folder in the database with the name 'todos' and store data with the schema
const model = mongoose.model('todos', todoSchema)
module.exports = model;