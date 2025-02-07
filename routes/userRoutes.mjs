import express from 'express'
import { usersController } from '../controllers/usersController.mjs'

const users = express.Router()

users.post('/', usersController.postUser)


export{ users }