import { pool } from "../database/postgresConnection.mjs"


const userModel = {
    checkUsername: async (username) => {
        try {
            const checkUserEmail = await pool.query('SELECT FROM users WHERE email = $1',[username])
        
            return checkUserEmail.rowCount
        } catch (error) {
            console.error(error)
        }


    },

    checkUserEmail: async (email) => {        
        try {
            const checkUserEmail = await pool.query('SELECT FROM users WHERE email = $1',[email])
            return checkUserEmail.rowCount
        } catch (error) {
            console.error(error)
        }

    },

    postUser: async (first_name, last_name, email, username, password, roleid) => {

        try {
            const createUser = await pool.query('INSERT INTO users (first_name, last_name, email, username) VALUES ($1, $2, $3, $4);', 
                [first_name, last_name, email, username])

               if(createUser.rowCount === 0 ) {
                return 0
               }
                
            const findUserId = await pool.query('SELECT * FROM users WHERE email = $1',[email])

            const userId = findUserId.rows[0].id
                       
            const savePassword = await pool.query('INSERT INTO users_secrets (userid, password, roleid ) VALUES ($1, $2, $3);',[userId, password, roleid ])

            return savePassword.rowCount
            
        } catch (error) {
            console.error(error)
        }
    }
}

export {userModel}