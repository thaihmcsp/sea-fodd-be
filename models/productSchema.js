const mongoose = require('./dbConnect')

const productSchema = mongoose.Schema(
    {
        idCategory: { type: String, ref: 'categories' },
        price: Number,
        storage: Number,
        productPic: [{ type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYTzj3XRf3wprzGJD2x83XA59JHEuqsXBWOLg1U5zD-w&s' }],
        createDate: Date,
        productName: String,
        isActive: { type: Boolean, default: true}
    }, { collection: 'product' }
)

productSchema.methods.checkStorage = async function () {
    if (this.storage < 0 || !this.storage) {
        this.storage = 0;
        this.save();
    }
}

let productModel = mongoose.model('product', productSchema)

module.exports = productModel