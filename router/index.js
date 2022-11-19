const router = require("express").Router();
const path = require("path");
const { checkToken } = require("../midderware/auth");
const adminRouter = require("./adminRouter");
const userRouter = require("./userRouter");
const staffRouter = require("./staff/staffRouter");

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use('/staff', staffRouter);

module.exports = router;