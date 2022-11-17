const mongoose = require('./dbConnect')

const categoriesSchema = mongoose.Schema(
    {
        categoriesName: String,
        thumpNail: {type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuxOnD4EYm59VltIUbLTKzYZwRsSTKc5EYrw&usqp=CAU'},
    }, { collection: 'categories' }
)

let categoriesModel = mongoose.model('categories', categoriesSchema)

module.exports = categoriesModel