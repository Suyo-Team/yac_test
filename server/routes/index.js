// --- Imports
const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const moment = require('moment')
const excuteQuery = require('../lib/db')

// --- Render of index
router.post('/login', async (req, res) => {
    const { user, password } = req.body
    let hash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");
    const { status, results } = await excuteQuery({
        query: 'SELECT * FROM users WHERE user_name = ? AND password = ?',
        values: [user, hash]
    })
    if (status) {
        if (results.length > 0) {
            const { id, user_name, email } = results[0]
            res.end(JSON.stringify({ message: 'User found', user: { id, user_name, email }, error: false }))
        } else {
            res.end(JSON.stringify({ message: 'User not found', error: true }))
        }
    } else {
        res.end(JSON.stringify({ message: 'User not found', error: true }))
    }
});

router.post('/register', async (req, res) => {
    const { name, user_name, password, email } = req.body
    const hash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const result = await excuteQuery({
        query: 'INSERT INTO users ( email, created_at, user_name, name, password) VALUES (?, ?, ?, ?, ?)',
        values: [email, createdAt, user_name, name, hash]
    })
    if (result.status) {
        res.end(JSON.stringify({ message: 'The user was created', user: { id: result.results.insertId, user_name, email }, error: false }))
    } else {
        res.end(JSON.stringify({ message: 'The user could not be created', error: true }))
    }
})

router.get('/getChat', async (req, res) => {
    const result = await excuteQuery({
        query: 'SELECT history_messages.user_id as id_user, history_messages.message as text, users.user_name as username, history_messages.created_at FROM history_messages INNER JOIN users ON history_messages.user_id = users.id'
    })
    
    if (result.status) {
        res.end(JSON.stringify({ rom: result.results, error: false }))
    } else {
        res.end(JSON.stringify({ message: 'Something happened', error: true }))
    }
})

router.post('/setChat', async (req, res) => {
    const { user_id, message } = req.body
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const result = await excuteQuery({
        query: 'INSERT INTO history_messages(user_id, message, created_at) VALUES (?, ?, ?)',
        values: [user_id, message, created_at]
    })
    if(result.status){
        res.end(JSON.stringify({ message: "Success!", error: false }))
    }else{
        res.end(JSON.stringify({ message: "Something happened!", error: true }))
    }

})

module.exports = router;