const express = require('express')
const router = express.Router()
const moment=require('moment')
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
    const currentTransaction = req.body.transaction
    conditions = {
        amount: currentTransaction.amount,
        vendor: currentTransaction.vendor,
        category: currentTransaction.category,
    }
    await Transaction.findOneAndDelete(conditions)
    res.send()
})

router.get('/transactions/:category', async (req, res) => {
    const category = req.params.category
    const startDate = Object.keys(req.query).length ? moment(req.query.startDate) : null
    const endDate = Object.keys(req.query).length ? moment(req.query.endDate) : null
    let conditions = {}

    if (category !== "all")
        conditions["category"] = category
    if (startDate && endDate)
        conditions["date"] = { "$gte": startDate, "$lte": endDate }
    else if (startDate)
        conditions["date"] = { "$gte": startDate }
    else if (endDate)
        conditions["date"] = { "$lte": endDate }
    const transactions = await Transaction.find(conditions)
    res.send(transactions)
})




module.exports = router