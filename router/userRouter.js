const express = require('express')
const router = express.Router();
const userController = require('../controller/user/userController');
const authController = require('../controller/user/authController');
const productController = require('../controller/user/productController');
const orderController = require('../controller/user/orderController');

const multer = require('multer')
const path = require('path');
const { checkToken } = require('../midderware/auth');
const userCommentRouter = require('./userCommentRouter')
const userCartsRouter = require('./userCartsRouter')
const userAccountRouter = require('./userAccountRouter');
const { getAllCategory, getOneCategory } = require('../controller/user/categoryController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/assets/img/avatar')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})

const upload = multer({ storage: storage })
// user
router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/checkCode', userController.checkCodeMail)
router.post('/forgotPass', userController.forgotPassword);
router.use('/CheckMail', userAccountRouter);

// router.use(checkToken)
router.get('/', checkToken, userController.getUserInfor);
router.post('/refreshToken', userController.refeshToken);
router.post('/logout', checkToken, userController.logOut);
router.patch('/changePassword', checkToken, userController.changePassword);
router.put('/', checkToken, upload.single('avatar'), userController.editUserInfor);

// carts
router.use('/carts', userCartsRouter);
// ----------------------------------------------------------------
// productCode
// router.get('/fillter', userController.getFillterProductCode)
// router.get('/testFillter', userController.testNewSearch)
// router.get('/list', userController.getAdllProductCode)
// router.get('/search', userController.getListSearchInput)
// product
router.get('/productlist', productController.getListProdutc);
router.get('/product/get-one-product/:idProduct', productController.getOneProduct);
router.get('/product/filter', productController.productFilter);
router.get('/get-products-of-category/:idCategory', productController.getProductsOfCategory);

// category
router.get('/get-all-category', getAllCategory);
router.get('/get-one-category/:idCategory', getOneCategory);
// order 

router.get('/orders', checkToken, orderController.followOrderUser);
router.get('/order/:idOrder', checkToken, orderController.getInforOrderSelect);
router.post('/order', checkToken, orderController.createOrderUser);
router.patch('/order/:idOrder', checkToken, orderController.changeOrderStatus);

// comment
router.use('/comment', userCommentRouter)
module.exports = router