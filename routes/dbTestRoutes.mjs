import express from 'express'
import { dbTestController } from '../controllers/dbTestController.mjs'


const dbtest = express.Router()

dbtest.get('/', dbTestController.getDbTest)

export { dbtest }