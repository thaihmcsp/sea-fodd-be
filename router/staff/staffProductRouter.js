const { createProduct, editProduct } = require('../../controller/admin/productController');
const router = require('express').Router();
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

router.post('/create', upload.single('productPic'), createProduct);
router.patch('/update/:idProduct', upload.single('productPic'), editProduct);

module.exports = router;