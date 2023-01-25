// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const activitySchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
        // amount: { type: Number, required: true },
		// ready: { type: Boolean, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Activity = model('Activity', activitySchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Activity
