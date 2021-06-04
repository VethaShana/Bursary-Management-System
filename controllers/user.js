import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

// @desc Delete user
export const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.user)
		res.status(200).json(user)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// @desc Get user
export const getUser = async (req, res) => {
	const user = await User.findById(req.user)
	res.status(200).json({ user })
}
