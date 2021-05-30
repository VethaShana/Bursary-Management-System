import mongoose from 'mongoose'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Token from './Token.js'
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

userSchema.methods.createAccessToken = async function () {
	try {
		const { _id, email, role } = this
		const accessToken = jwt.sign(
			{ user: { _id, email, role } },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '10m' }
		)
		return accessToken
	} catch (err) {
		console.log(err)
		return
	}
}

userSchema.methods.createRefreshToken = async function () {
	try {
		const { _id, email, role } = this
		const refreshToken = jwt.sign(
			{ user: { _id, email, role } },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		)
		await new Token({ token: refreshToken }).save()
		return refreshToken
	} catch (err) {
		console.log(err)
		return
	}
}

const User = mongoose.model('user', userSchema)

export default User
