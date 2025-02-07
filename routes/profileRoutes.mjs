import express from 'express'
import { profileController } from '../controllers/profileController.mjs'

const profile = express.Router()


profile.get('/', profileController.getAllData)


export {profile}