import express from 'express'
import { loginController } from '../controllers/loginController.mjs'

const login = express.Router()

login.post('/', loginController.postUsers)

export { login }