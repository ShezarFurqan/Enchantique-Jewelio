import express from "express"
import {placeOrder,placeOrderEasypaisa,placeOrderJazzcash,updateStatus,userOrders,allOrders, cancelOrder} from '../controllers/ordersController.js'
import adminAuth from '../middlewares/admin.Auth.js'
import authUser from "../middlewares/auth.js"

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/jazzcash',authUser,placeOrderJazzcash)
orderRouter.post('/easypaisa',authUser,placeOrderEasypaisa)

// User Feature
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.put('/cancelorder',authUser,cancelOrder)

export default orderRouter