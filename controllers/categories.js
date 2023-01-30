// Import Dependencies
const express = require('express')
const Category = require('../models/category')

// Create router
const router = express.Router()

// index ALL events
router.get('/', (req, res) => {
	Category.find({})

		.then(categories => {
			
			res.render('categories/index', { categories })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router