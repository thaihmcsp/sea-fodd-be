const express = require("express");
const router = express.Router();
const categoryController = require("../controller/admin/categoryController");
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
router.get("/", categoryController.getListCategories);
router.get('/:idCategories', categoryController.getInforCategories)
router.post("/", upload.single("thumpNail"), categoryController.createCategories);
router.put("/:idCategories", upload.single("thumpNail"), categoryController.editCategories
);
router.delete("/:idCategories", categoryController.deleteCategories);

module.exports = router;