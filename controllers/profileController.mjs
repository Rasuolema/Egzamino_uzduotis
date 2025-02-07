import { profileModel } from "../models/profileModel.mjs"

const profileController = {

    getAllData: async (req, res) => {
        try {
            const getAllData = await profileModel.getAllData()
            res.status(200).json({status: 'ok', msg: 'all data get successfully', data: getAllData})
        } catch (error) {
           console.error(error) 
        }
    }


}

export { profileController }