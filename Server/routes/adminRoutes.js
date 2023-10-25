const isAuth = require("../middleware/authMiddleware");
const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();

router.get('/view-requests', isAuth,  adminController.getRequests )

router.post("/add-product", isAuth, adminController.addProduct);

router.get("/admin/delete-request/:reqId",isAuth, adminController.deleteRequest)

module.exports = router;
