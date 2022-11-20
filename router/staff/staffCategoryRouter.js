const { createCategories, editCategories } = require('../../controller/admin/categoryController');
const router = require('express').Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./views/assets/img/categoriesPic");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post('/create', upload.single('thumpNail'), createCategories);
router.patch('/update/:idCategories', upload.single('thumpNail'), editCategories);

module.exports = router;