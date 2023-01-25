// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const projectSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
		due: { type: Date, required: false },
		activities: { type: Array, required: false }, // if I want to use IDs
		// activities: [Activity],
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Project = model('Project', projectSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Project
