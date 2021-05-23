import User from '../models/user.js'
import Token from '../models/Token.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
	const { email } = req.body
	try {
		let user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ error: 'No user found!' })
		} else {
			let valid = await bcrypt.compare(req.body.password, user.password)
			if (valid) {
				let accessToken = await user.createAccessToken()
				let refreshToken = await user.createRefreshToken()
				return res.status(201).json({ accessToken, refreshToken })
			} else {
				return res.status(401).json({ error: 'Invalid password!' })
			}
		}
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Internal Server Error!' })
	}
}

export const register = async (req, res) => {
	const { email, password } = req.body
	try {
		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({ error: 'email already in use.' })
		} else {
			user = await new User({ email, password }).save()
			const accessToken = await user.createAccessToken()
			const refreshToken = await user.createRefreshToken()
			return res.status(201).json({ accessToken, refreshToken })
		}
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Internal Server Error!' })
	}
}

export const logout = async (req, res) => {
	try {
		const { refreshToken } = req.body
		await Token.findOneAndDelete({ token: refreshToken })
		return res.status(200).json({ success: 'User logged out!' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Internal Server Error!' })
	}
}

export const generateRefreshToken = async (req, res) => {
	try {
		const { refreshToken } = req.body
		if (!refreshToken) {
			return res
				.status(403)
				.json({ error: 'Access denied,token missing!' })
		} else {
			const tokenDoc = await Token.findOne({ token: refreshToken })
			if (!tokenDoc) {
				return res.status(401).json({ error: 'Token expired!' })
			} else {
				const payload = jwt.verify(
					tokenDoc.token,
					process.env.REFRESH_TOKEN_SECRET
				)
				const accessToken = jwt.sign(
					{ user: payload },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: '10m'
					}
				)
				return res.status(200).json({ accessToken })
			}
		}
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Internal Server Error!' })
	}
}
