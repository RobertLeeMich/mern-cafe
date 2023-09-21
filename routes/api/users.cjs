const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users.cjs')
const ensureLoggedIn  = require('../../config/ensureLoggedIn.cjs')


//defining route, not invoking usersCtrl.create, we're just passing the function to the route
//this is the request, localhost:3001/api/users
router.post('/', usersCtrl.create)

router.post('/login', usersCtrl.login)

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

module.exports = router