// Import Dependencies
const express = require('express')
// const Event = require('../models/event')
const Project = require('../models/project')
const Category = require('../models/category')

// Create router
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////
// Subdocuments are not mongoose models. That means they don't have their own collection, and they don't come with the same model methods that we're used to(they have some their own built in.)
// This also means, that a subdoc is never going to be viewed without it's parent document. We'll never see a event without seeing the project it was evented on first.

// This also means, that when we make a subdocument, we must MUST refer to the parent so that mongoose knows where in mongodb to store this subdocument

// this is coming through the event controller, ie /event
// POST -> `/events/<someProjectId>`

// only loggedin users can post events
// bc we have to refer to a project, we'll do that in the simplest way via the route
// router.post('/:projectId', (req, res) => {
//     // first we get the projectId and save to a variable
//     const projectId = req.params.projectId
//     // then we'll protect this route against non-logged in users
//     console.log('this is the session\n', req.session)
//     if (req.session.loggedIn) {
//         // if logged in, make the logged in user the owner of the event
//         // this is exactly like how we added the owner to our projects

//         // req.body.author = req.session.userId
//         // saves the req.body to a variable for easy reference later
//         const theEvent = req.body
//         // find a specific project
//         Project.findById(projectId)
//             .then(project => {
//                 // create the event(with a req.body)
//                 project.events.push(theEvent)
//                 // save the project
//                 return project.save()
//             })
//             // respond with a 201 and the project itself
//             .then(project => {
//                 // res.status(201).json({ project: project })
//                 res.redirect(`/projects/${project.id}`)
//             })
//             // catch and handle any errors
//             .catch(err => {
//                 console.log(err)
//                 // res.status(400).json(err)
//                 res.redirect(`/error?error=${err}`)
//             })
//     } else {
//         // res.sendStatus(401) //send a 401-unauthorized
//         res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20add%20an%20event%20on%20this%20project`)
//     }
// })

// // DELETE -> `/events/delete/<someProjectId>/<someEventId>`
// // make sure only the author of the event can delete the event
// router.delete('/delete/:projectId/:eventId', (req, res) => {
//     // isolate the ids and save to variables so we don't have to keep typing req.params
//     // const projectId = req.params.projectId
//     // const eventId = req.params.eventId

// 	// destructured version 
//     const { projectId, eventId } = req.params

//     // get the project
//     Project.findById(projectId)
//         .then(project => {
//             // get the event, we'll use the built in subdoc method called .id()
//             const theEvent = project.events.id(eventId)
//             console.log('this is the event to be deleted: \n', theEvent)
//             // then we want to make sure the user is loggedIn, and that they are the author of the event
//             if (req.session.loggedIn) {
// 				theEvent.remove()
//                     project.save()
//                     // res.sendStatus(204) //send 204 no content
//                     res.redirect(`/projects/${project.id}`)


//                 // if they are the author, allow them to delete
//                 // if (theEvent.author == req.session.userId) {
//                 //     // we can use another built in method - remove()
//                 //     theEvent.remove()
//                 //     project.save()
//                 //     // res.sendStatus(204) //send 204 no content
//                 //     res.redirect(`/projects/${project.id}`)
//                 // } else {
//                 //     // otherwise send a 401 - unauthorized status
//                 //     // res.sendStatus(401)
//                 //     res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20event`)
//                 // }
//             } else {
//                 // otherwise send a 401 - unauthorized status
//                 // res.sendStatus(401)
//                 res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20event`)
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             // res.status(400).json(err)
//             res.redirect(`/error?error=${err}`)
//         })
// })


// //////////////////////////////
// //// Export Router        ////
// //////////////////////////////
// module.exports = router








/// -----------------------------------------------
// Event as its own model

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
	Event.find({})
		.then(events => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('events/index', { events, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's events
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Event.find({ owner: userId })
		.then(events => {
			res.render('events/index', { events, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session

	// res.render('events/new', { username, loggedIn, projects, categories })

	Project.find({})
		.then(projects => {
			Category.find({})
				.then(categories => {
					console.log('req.body', req.body)
					res.render('events/new', { username, loggedIn, projects, categories })
				})
				.catch(error => {
					console.log('req.body', req.body)
					res.redirect(`error?error=${error}`)
				})
		})
	
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	// req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId

	console.log('req.body', req.body)

	Event.create(req.body)
		.then(event => {
			console.log('this was returned from create', event)
			res.redirect('/events')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const eventId = req.params.id
	Event.findById(eventId)
		.then(event => {
			res.render('events/edit', { event })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const eventId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Event.findByIdAndUpdate(eventId, req.body, { new: true })
		.then(event => {
			res.redirect(`/events/${event.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const eventId = req.params.id
	Event.findById(eventId)
		.then(event => {
            const {username, loggedIn, userId} = req.session
			res.render('events/show', { event, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const eventId = req.params.id
	Event.findByIdAndRemove(eventId)
		.then(event => {
			res.redirect('/events')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
