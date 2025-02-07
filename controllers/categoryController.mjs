import { categoryModels } from "../models/categoryModels.mjs"


const categoryController = {

    categoryGet: async (req, res) => {
        try {
            const categoryData = await categoryModels.categoryData()
           
            res.status(200).json({
                status: 'ok', 
                msg:'all category data received',
                data:categoryData})

        } catch (error) {
          console.error(error)  
        }
    },

    categoryGetById: async (req,  res) => {
        const{id} = req.params
        try {
            const categoryGetById = await categoryModels.categoryGetById(id)
            if(categoryGetById.length === 0){
                res.status(404).json({status: 'err', msg: 'Category not found'})
            }
        res.status(200).json({status: 'ok', msg:'Category get successfully', data: categoryGetById })

        } catch (error) {
            console.error(error)
        }
    },

    categoryPost: async (req, res) => {
        const { category } = req.body
             
        try {
            const categoryFind = await categoryModels.categoryFind(category)
    
            if(categoryFind > 0){
             return res.status(409).json({status: 'err', msg: 'category already exists'})
            }   
            const categoryCreate = await categoryModels.categoryPost(category)          
            if(categoryCreate === 1){
                res.status(200).json({status: 'ok', msg: 'category is created '})
            }
            
        } catch (error) {
            console.error(error)
        }

    },

    categoryPut: async(req, res) => {
        const {id} = req.params
        const {category_type} = req.body
      try {
        const categoryFind = await categoryModels.categoryFind(category_type)
    
        if(categoryFind > 0){
         return res.status(409).json({status: 'err', msg: 'category already exists'})
        } 
        
        const categoryUpdate = await categoryModels.categoryUpdate(category_type, id)
       
        if(categoryUpdate === 1){
           return res.status(200).json({status: 'ok', msg: 'category updated successfully' })
        } else {
            return res.status(500).json({status: 'err', msg: 'DB error '})
        }



      } catch (error) {
        console.error(error)
      }

    },

    categoryDelete: async (req, res) => {
        const {id} = req.params
        try {
            const categoryDelete = await categoryModels.gcategoryelete(id)
           
            if(categoryDelete > 0){
                res.status(200).json({status: 'ok', msg: 'Category completely deleted'})
            }else{
                res.status(404).json({status:'err', msg:'No data to delete'})
            }

        } catch (error) {
          console.error(error)  
        }

    }
}

export {categoryController}