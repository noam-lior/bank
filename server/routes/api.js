const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')

router.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find({})
    res.send(transactions)
})

router.post('/transaction', (req, res) => {
    const newTransaction = new Transaction(req.body)
    newTransaction.save()
    res.send()
})
router.delete('/transaction', async (req, res) => {
    const currentTransaction = req.body
    conditions = {
        amount: currentTransaction.amount,
        vendor: currentTransaction.vendor,
        category: currentTransaction.category,
    }
    await Transaction.findOneAndDelete(conditions)
    res.send()
})

router.get('/transaction/:category',(req,res)=>{
    const category=req.params.category
    const transactions=Transaction.find({category})
    res.send(transactions)
})




module.exports = router