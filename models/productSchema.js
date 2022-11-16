const mongoose = require('./dbConnect')

const productSchema = mongoose.Schema(
    {
        idProductCode: { type: String, ref: 'productCode' },
        price: Number,
        priceRange: String,
        storage: Number,
        productPic: [{ type: String }],
        productType: String,
        size: String,
        createDate: Date,
        countSold: Number,
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