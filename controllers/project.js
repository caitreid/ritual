// Import Dependencies
const express = require('express')
const Project = require('../models/project')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Project.find({})
		.then(projects => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('projects/index', { projects, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's projects
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Project.find({ owner: userId })
		.then(projects => {
			res.render('projects/index', { projects, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('projects/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	// req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Project.create(req.body)
		.then(project => {
			console.log('this was returned from create', project)
			res.redirect('/projects')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)

			// console.log(req)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const projectId = req.params.id
	Project.findById(projectId)
		.then(project => {
			res.render('projects/edit', { project })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// Update 
router.put('/:id', (req, res) => {
	const projectId = req.params.id
	// req.body.ready = req.body.ready === 'on' ? true : false

	Project.findByIdAndUpdate(projectId, req.body, { new: true })
		.then(project => {
			res.redirect(`/projects/${project.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const projectId = req.params.id
	Project.findById(projectId)
		.then(project => {
            const {username, loggedIn, userId} = req.session
			res.render('projects/show', { project, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const projectId = req.params.id
	Project.findByIdAndRemove(projectId)
		.then(project => {
			res.redirect('/projects')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
