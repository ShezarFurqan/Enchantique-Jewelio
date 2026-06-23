import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using cod method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        console.log(userId, items, amount, address)

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()  // Use Date.now() for current timestamp
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });  // Changed response to res
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// placing orders using JazzCash method
const placeOrderJazzcash = async (req, res) => {

}

// placing orders using Easypaisa method
const placeOrderEasypaisa = async (req, res) => {

}

// All orders data for Admin Panel
const allOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// User orders data for Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body; 

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// update order status from Admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const cancelOrder = async (req, res) => {
    try {

        const { orderId } = req.body
        
        const order = await orderModel.findByIdAndUpdate(orderId,{ordercancel: true})

        res.json({success: true, message: "Order Cancelled Successfully"})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, placeOrderEasypaisa, placeOrderJazzcash, updateStatus,userOrders, allOrders, cancelOrder }