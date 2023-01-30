// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const Project = require('./project')
const Category = require('./category')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const eventSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
		date: { type: Date, required: true },
		category: {
			type: Schema.Types.ObjectID,
			ref: 'Category'
		}, // eventually set to an array to have more than one category
		project: {
			type: Schema.Types.ObjectID,
			ref: 'Project'
		},
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
// module.exports = eventSchema
module.exports = Event
