const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await Order.findOne({ 'email': req.body.email })
    // console.log(eId)
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data],
                order_date: new Date().toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }),
                
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})



router.post('/myorderdata', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        if (!myData) {
            return res.status(404).send("Order data not found");
        }
        // console.log(myData);
        res.status(200).json({ orderData: myData });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;