// import dependencies
const mongoose = require('./connection')

// import user model for populate
// const User = require('./user')


// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const categorySchema = new Schema(
	{
		title: { type: String, required: true },
	}
)

const Category = model('Category', categorySchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Category