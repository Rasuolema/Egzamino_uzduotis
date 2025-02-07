import { pool } from "../database/postgresConnection.mjs"


const categoryModels = {
categoryData: async () => {
    try {
        const categoryData = await pool.query(`SELECT * FROM category ORDER BY id ASC`)       
        return categoryData.rows
        
    } catch (error) {
        console.error(error)
    }
},

categoryGetById: async (id) => {
    try {
        const dataGetById = await pool.query(`SELECT * FROM category Where id = $1;`, [id])
        return dataGetById.rows
    } catch (error) {
        console.error(error)
    }
},

categoryFind: async (data) => {
    
    try {
        const categoryFind = await pool.query(`SELECT * FROM category WHERE category_type = $1;`, [data])
       
        return categoryFind.rowCount

    } catch (error) {
       console.error(error) 
    }
},

categoryPost: async (data) => {
    try {
        const categoryCrete = await pool.query('INSERT INTO category (category_type) VALUES ($1);',[data])
        return categoryCrete.rowCount
    } catch (error) {
       console.error(error) 
    }
},

categoryUpdate: async (category, id) => {
        
    try {
        const categoryUpdate = await pool.query('UPDATE category SET category_type = $1 WHERE id = $2;',[category, id])
        
        return categoryUpdate.rowCount
      
    } catch (error) {
        console.error(error)
    }
},

categoryDelete: async (data) => {
    try {
      const categoryDeleted = await pool.query('DELETE FROM category * WHERE id = $1;',[data])
       return categoryDeleted.rowCount
    } catch (error) {
        console.error(error) 
    } 
}

}
export { categoryModels }