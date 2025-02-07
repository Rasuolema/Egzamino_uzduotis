import { userModel } from "../models/userModel.mjs";

const usersController = {
    postUser: async (req, res) =>{
        const {first_name, last_name, email, username, password, roleid} = req.body; 
      
        try {
            const checkUsername = await userModel.checkUsername(username)

            if(checkUsername === 1){
                return res.status(409).json({status:'err', msg: 'user with this credentials already exsist'})
            }
            
            const checkUserEmail = await userModel.checkUserEmail(
                email,              
            )
          
            if(checkUserEmail === 1){
                return res.status(409).json({status:'err', msg: 'user with this credentials already exsist'})
            }
           
            const createUser = await userModel.postUser(
                first_name,
                last_name,
                email,
                username,
                password,
                roleid,
            )

            if (createUser === 0){
                res.status(500).json({status: 'err', msg:'DB connection error'})
            }            

           res.status(200).json({status: 'ok', msg: 'user created '})
            


        } catch (error) {
            console.error(error)
        }


    }
}

export {usersController}