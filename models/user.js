import mongoose from 'mongoose'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ROLES from '../utils/roles.js'

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	isVerified: {
		type: Boolean,
		default: false
	},

	role: {
		type: String,
		required: true,
		default: ROLES.STUDENT,
		enum: ['student', 'admin', 'dean']
	}
})

userSchema.pre('save', async function (next) {
	try {
		const salt = await bycrypt.genSalt()
		this.password = await bycrypt.hash(this.password, salt)
		next()
	} catch (err) {
		console.log(err)
	}
})

userSchema.methods.createToken = async function () {
	try {
		const { _id, email, role } = this
		const accessToken = jwt.sign(
			{ user: { _id, email, role } },
			process.env.JWT_SECRET,
			{ expiresIn: '1w' }
		)
		return accessToken
	} catch (err) {
		console.log(err)
		return
	}
}

const User = mongoose.model('user', userSchema)

export default User
