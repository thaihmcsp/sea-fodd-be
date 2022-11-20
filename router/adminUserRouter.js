const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin/userController');
const path = require('path');
const multer = require('multer');

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
router.get('/', adminController.getListUser)
router.get('/:idUser', adminController.getInforUserSelect)
router.post('/', adminController.testCreateUser)
router.put('/', upload.single('avatar'), adminController.updateUserInfor)
router.put('/:idUser', adminController.updateUserRole)
router.delete('/:idUser', adminController.deleteUser);
router.patch('/changeRole/:idUser', adminController.changeUserRole);

module.exports = router