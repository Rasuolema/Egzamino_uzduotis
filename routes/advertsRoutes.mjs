
import express from 'express'
import {  advertController } from '../controllers/advertController.mjs'


const advert = express.Router()

advert.get('/', advertController.getAdvert)
advert.post('/', advertController.postAdvert)
advert.post('/search', advertController.searchAdvert)
advert.get('/:id', advertController.getAdvertById)
advert.put('/:id', advertController.putAdvert)
advert.delete('/:id', advertController.deleteAdvert)

export {advert}


