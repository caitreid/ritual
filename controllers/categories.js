// Import Dependencies
const express = require('express')
const Category = require('../models/category')

// Create router
const router = express.Router()

// index ALL events
router.get('/', (req, res) => {
	Category.find({})
		// .populate('project', 'title')
        // .populate('category', 'title')

		.then(categories => {
			// const username = req.session.username
			// const loggedIn = req.session.loggedIn
			
			res.render('categories/index', { categories })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router