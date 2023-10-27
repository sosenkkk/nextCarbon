const isAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware")
const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();

router.get('/view-requests', isAuth, isAdmin, adminController.getRequests )

router.get('/view-orders', isAuth, isAdmin, adminController.getOrders )

router.get('/admin/order/:orderId', isAuth, isAdmin, adminController.getSingleOrder )

router.get('/view-requests/:reqId', isAuth, isAdmin,  adminController.getRequest )

router.get("/get-add-product", isAuth, isAdmin, adminController.getAddProduct);

router.post("/add-product", isAuth, isAdmin, adminController.addProduct);

router.get("/delete-request/:reqId",isAuth, adminController.deleteRequest)

module.exports = router;
