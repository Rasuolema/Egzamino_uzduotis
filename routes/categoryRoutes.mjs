import express from 'express'
import { categoryController } from '../controllers/categoryController.mjs'


const category = express.Router()

category.get('/', categoryController.categoryGet )
category.get('/:id', categoryController.categoryGetById )
category.post('/', categoryController.categoryPost )
category.delete('/:id', categoryController.categoryDelete )
category.put('/:id', categoryController.categoryPut )

export { category }