import express from 'express'
import * as UsersController from '../controllers/user.js'
import auth from '../middleware/auth.js'
import ROLES from '../utils/roles.js'

const router = express.Router()

router.delete('/', auth(ROLES.ADMIN), UsersController.deleteUser)
router.get('/', auth(ROLES.ADMIN), UsersController.getUser)

export default router
