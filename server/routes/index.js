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
            res.end(JSON.stringify({ message: 'Usuario encontrado', user: {id, user_name, email}, error: false }))
        } else {
            res.end(JSON.stringify({ message: 'Usuario no encontrado', error: true }))
        }
    } else {
        res.end(JSON.stringify({ message: 'Usuario no encontrado', error: true }))
    }
});

router.post('/register', async (req, res) => {
    const { name, user_name, password, email } = req.body
    console.log(req.body)
    const hash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const result = await excuteQuery({
        query: 'INSERT INTO users ( email, created_at, user_name, name, password) VALUES (?, ?, ?, ?, ?)',
        values: [email, createdAt, user_name, name, hash]
    })
    console.log(result)
    if (result.status) {
        console.log(result)
        res.end(JSON.stringify({ message: 'El usuario fue creado', user: { id: result.results.insertId, user_name, email }, error: false }))
    } else {
        res.end(JSON.stringify({ message: 'El usuario no pudo ser creado', error: true }))
    }
})

module.exports = router;