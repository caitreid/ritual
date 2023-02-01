/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('./connection')
// const Fruit = require('./fruit')
const Project = require('./project')
const User = require('./user')
const Category = require('./category')
const Event = require('./event')


/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////
// first, we'll save our db connection to a variable
const db = mongoose.connection

db.on('open', () => {
    const startUsers = [
        { username: "caitreid", password: "purple", _id: "63d007f2cfa536211c32c6ca" }
    ]
    User.deleteMany()
    .then(() => {
        User.create(startUsers)
        .then((data) => {
            console.log('here are the users we created: \n', data)

            // db.close()
        })
        .catch(err => {
            console.log(err)

            db.close()
        })
    })
    // all owned by the existing user, caitreid
    const startProjects = [
        { title: "New Arts Portfolio Website",
         description: "Ruby on Rails based portfolio website",
         due: '2023-06-17T03:24:00',
         owner: "63d007f2cfa536211c32c6ca",
         _id: "63d81c89879c235c358ebd41",
        // events: [{
        //     type: Schema.Types.ObjectID,
        //     ref: 'Event'
        // }]
        events: ["63d83f96120f5132d63342c4", "63d83f96120f5132d63342c5", "63d83f96120f5132d63342c6", "63d83f96120f5132d63342c7", "63d83f96120f5132d63342c8", "63d83f96120f5132d63342c9", "63d83f96120f5132d63342ca", "63d83f96120f5132d63342cb", "63d83f96120f5132d63342cc", "63d83f96120f5132d63342cd", "63d83f96120f5132d63342cf", "63d83f96120f5132d63342ce"]
        },
        {
            title: "Greek Myth Project",
            description: "20 panel painting rewriting the myth of Persephone, Demeter and Hades",
            due: "2023-12-17T03:24:00",
            owner: "63d007f2cfa536211c32c6ca",
        },
        {
            title: "Grad School Applications",
            description: "Apply to MFA programs",
            due: "2024-01-01T03:24:00",
            owner: "63d007f2cfa536211c32c6ca",
        }
    ]
    Project.deleteMany()
    .then(() => {
        Project.create(startProjects)
        .then((data) => {
            console.log('here are the projects we created: \n', data)

            // db.close()
        })
        .catch(err => {
            console.log(err)

            db.close()
        })
    })

    const startCategories = [
        { title: "Research" },
        { title: "Project Planning", _id: "63d81c89879c235c358ebd46" },
        { title: "Writing" },
        { title: "Editing" },
        { title: "Morning Pages" }
    ]

    Category.deleteMany()
    .then(() => {
        Category.create(startCategories)
        .then((data) => {
            console.log('here are the categories we created: \n', data)

            // db.close()
        })
        .catch(err => {
            console.log(err)

            db.close()
        })
    })

    const startEvents = [
        {   
         title: 'Writing at the public library',
		    description: 'Here is the description',
		    date: '2023-01-26T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342c4"
        },
        {   
            title: 'Studio visit',
            description: 'Sunday the folks from crit club came over to discuss everyones work',
            date: '2023-01-22T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342c5"
        },
        {   
            title: 'Researching sources',
            description: 'Went to NYPL to find new sources of info for project',
            date: '2023-01-18T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342c6"
        },
        {   
            title: 'Editing',
            description: 'Starting reviewing past projects begun in 2022',
            date: '2023-01-18T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342c7"
        },
        {   
            title: 'Writing at the public library',
            description: 'Here is the description',
            date: '2023-01-12T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342c8"
        },
        {   
            title: 'Studio visit',
            description: 'Sunday the folks from crit club came over to discuss everyones work',
            date: '2023-01-08T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342c9"
        },
        {   
            title: 'Researching sources',
            description: 'Went to NYPL to find new sources of info for project',
            date: '2023-01-07T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342ca"
        },
        {   
            title: 'Editing',
            description: 'Starting reviewing past projects',
            date: '2022-12-31T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342cb"
        },        {   
            title: 'Writing at the public library',
            description: 'Here is the description',
            date: '2022-12-30T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342cc"
        },
        {   
            title: 'Studio visit',
            description: 'Sunday the folks from crit club came over to discuss everyones work',
            date: '2023-01-05T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342cd"
        },
        {   
            title: 'Researching sources',
            description: 'Went to NYPL to find new sources of info for project',
            date: '2023-01-03T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342cf"
        },
        {   
            title: 'Editing',
            description: 'Starting reviewing past projects begun in 2022',
            date: '2023-01-02T00:00:00.000Z',
            category: '63d81c89879c235c358ebd46', // Project Planning
            project: '63d81c89879c235c358ebd41', // New arts portfolio website
            owner: "63d007f2cfa536211c32c6ca", // caitreid
            _id: "63d83f96120f5132d63342ce"
        }

    ]

    Event.deleteMany()
    .then(() => {
        Event.create(startEvents)
        .then((data) => {
            console.log('here are the events we created: \n', data)

            // db.close()
        })
        .catch(err => {
            console.log(err)

            db.close()
        })
    })
})

// db.on('open', () => {
//     // array of starter resources(fruits)
//     const startFruits = [
//         { name: 'Orange', color: 'orange', readyToEat: true },
//         { name: 'Grape', color: 'purple', readyToEat: true },
//         { name: 'Banana', color: 'green', readyToEat: false },
//         { name: 'Strawberry', color: 'red', readyToEat: false },
//         { name: 'Coconut', color: 'brown', readyToEat: true }
//     ]
//     // then we delete every fruit in the database(all instances of this resource)
//     // this will delete any fruits that are not owned by a user
//     Fruit.deleteMany({ owner: null })
//         .then(() => {
//             // then we'll seed(create) our starter fruits
//             Fruit.create(startFruits)
//                 // tell our app what to do with success and failures
//                 .then(data => {
//                     console.log('here are the created fruits: \n', data)
//                     // once it's done, we close the connection
//                     db.close()
//                 })
//                 .catch(err => {
//                     console.log('The following error occurred: \n', err)
//                     // always close the connection
//                     db.close()
//                 })
//         })
//         .catch(err => {
//             console.log(err)
//             // always make sure to close the connection
//             db.close()
//         })
// })