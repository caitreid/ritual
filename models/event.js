// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const Project = require('./project')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const eventSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
		project: {
			type: Schema.Types.ObjectID,
			ref: 'Project'
		},
		// category: {
		// 	type: Schema.Types.CategoryID,
		// 	ref: 'Category'
		// },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Event = model('Event', eventSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Event
