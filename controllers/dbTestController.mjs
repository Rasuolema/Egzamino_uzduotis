import {DbTestModel} from '../models/dbTestModels.mjs'

const dbTestController = {
    getDbTest: async (req, res) => {
    try {
        const dbTestData = await DbTestModel.getAdvert();

        res.status(200).json({
                status:'ok',
                msg:'DB test success',
                data: dbTestData,            
        });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'err', msg: "Can't get users data" });
    }
  }

}

export {dbTestController}