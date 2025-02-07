import { pool } from "../database/postgresConnection.mjs";

const advertModel = {


getAdverts: async () => {
    try {
        const result = await pool.query(`
SELECT   
advert.id, 
advert.title, 
advert.description,
advert.img_url, 
advert.price, 
category.category_type
FROM advert
INNER JOIN category
ON advert.categoryId = category.id
ORDER BY id ASC `);   
        return result.rows;
    } catch (error) {
        console.error(error);
    }
},

getAdvertById: async (id) => {
    try {
      const result = await pool.query(
        `SELECT   
        advert.id, 
        advert.title, 
        advert.description,
        advert.img_url, 
        advert.price, 
        category.category_type
        advert.updated_at
        FROM advert
        INNER JOIN category
        ON advert.categoryId = category.id
        WHERE advert.id = $1`, [id]);
      return result.rows; 
    } catch (error) {
      console.error(error);
    }
  },

categoryIdAdvert: async (categoryId) => {
    try {
       const categorySize = await pool.query(`SELECT * FROM category WHERE id = $1;`,[categoryId])
        return categorySize.rowCount
    } catch (error) {
       console.error(error) 
    }
},

searchAdvert: async(data) => {
    
    try {
        const searchAdvert = await pool.query(`SELECT * FROM advert WHERE LOWER (title) LIKE LOWER ($1) ;`,['%' + data + '%'])
        
        return searchAdvert.rows
    } catch (error) {
        console.error(error)
    }
},

createAdvert: async (jonas) => {
    const {title, description, img_url, price, categoryId } = jonas
    const categoryIdInt = parseInt(categoryId)
    const priceInt = parseInt(price)
    try {
       const insertAdvert = await pool.query(`
        INSERT INTO adverts (title, description, img_url, price, categoryId )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING title, description, img_url, price, categoryId`, 
        [title, description, img_url, categoryIdInt, priceInt ] )
        
       return insertAdvert.rows[0]

        
    } catch (error) {
        console.error(error)
    }
},

updateAdvert: async (newData, id  ) => {
    
    try { 
        
     const updateAdvert = await pool.query(
    `UPDATE advert 
      SET title = $1, 
      description = $2, 
      img_url = $3, 
      price = $4, 
      categoryId = $5,
      WHERE id = $6;`, [
        newData.title, 
        newData.description, 
        newData.img_url, 
        newData.price,
        newData.categoryId,
        id, 
     ]
     ) 
    
     return updateAdvert.rowCount

    } catch (error) {
        console.error(error)  
         return error.severity
    }  
},

deleteAdvert: async (id) => { 
    
    const deleteAdvert = await pool.query( `
        DELETE FROM advert
        WHERE id = $1;`,
        [id] )    
    return(deleteAdvert.rowCount)
}
    
}
export {advertModel}


