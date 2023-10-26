const isAuth = require("../middleware/authMiddleware");
const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();

router.get('/view-requests', isAuth,  adminController.getRequests )

router.get('/view-orders', isAuth,  adminController.getOrders )

router.get('/admin/order/:orderId', isAuth,  adminController.getSingleOrder )

router.get('/view-requests/:reqId', isAuth,  adminController.getRequest )

router.post("/add-product", isAuth, adminController.addProduct);

router.get("/delete-request/:reqId",isAuth, adminController.deleteRequest)

module.exports = router;
