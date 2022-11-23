const express = require('express')
const router = express.Router()
const productController = require('../controller/admin/productController')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/assets/img/productPic')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})
const upload = multer({ storage: storage });
router.get('/list', productController.getListProduct);
router.get('/filter', productController.productFilter);
router.get('/:idProduct', productController.getInforProduct);
router.post('/', upload.single('productPic'), productController.createProduct);
router.put('/:idProduct', upload.single('productPic'), productController.editProduct);
router.delete('/:idProduct', productController.deleteProduct);

module.exports = router;