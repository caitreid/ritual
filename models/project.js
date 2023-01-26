// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const Event = require('./event')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const projectSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
		due: { type: Date, required: false },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		// events: [eventSchema]
		events: [{
			type: Schema.Types.ObjectID,
			ref: 'Event'
		}]
	},
	{ timestamps: true }
)

const Project = model('Project', projectSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Project
