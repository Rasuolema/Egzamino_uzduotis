
import express from 'express'
import { dbtest } from "./dbTestRoutes.mjs";
import { advert } from "./advertsRoutes.mjs";
import { login } from './loginRoutes.mjs';
import { users } from './userRoutes.mjs';
import { category } from './categoryRoutes.mjs';
import { profile } from './profileRoutes.mjs';

const api = express.Router()

api.use('/dbtest', dbtest)
api.use('/advert',advert)
api.use('/users/login',login)
api.use('/users/register',users)
api.use('/category',category)
api.use('/profile' ,profile)

api.get('/', (req, res) => {
    res.status(200).json({status:'ok', msg:'Wrong address. API page is being created. Try another address'})
})


export { api }


