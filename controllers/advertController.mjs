
import { advertModel } from "../models/advertModel.mjs";


const advertController = {
  getAdvert: async (req, res) => {
    try {
      const dbAdvertsData = await advertModel.getAdverts()
      res.status(200).json({
        status:'ok', 
        msg:'Get all adverts list',
        data: dbAdvertsData,
      })
      
      
    } catch (err) {
        console.error(err)
        res.status(500).json({ status: 'err', msg: "Can't get adverts data" });
    }
  },

  getAdvertById: async (req, res) => {
    const { id } = req.params; 
  
    try { 
      const advert = await advertModel.getadvetById(id);
  
      if (advert.length === 0) {
        return res.status(404).json({
          status: 'err',
          msg: 'Advert not found',
        });
      }
  
      res.status(200).json({
        status: 'ok',
        msg: 'Advert found',
        data: advert,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'err', msg: "Can't get advert data" });
    }
  }, 

  searchAdvert: async (req, res) => {
    const{data} = req.body
   
    try {     
      const searchAdvert = await advertModel.searchAdvert(data)     
      res.status(200).json({status: 'ok', msg:"get search data successfully", data:searchAdvert})
    } catch (error) {
      console.error(error)
    }
  },

  postAdvert: async (req, res) => {
    const {title, description, img_url, price, categoryId } = req.body

    try {

    const checkCategory = await advertModel.categoryidMovie(categoryid)

    if(checkCategory === 0 ){
      return res.status(409).json({status:'err', msg:'wrong genre'})
    }

       const postAdvertResult = await advertModel.createAdvert({
        title,
        description,
        img_url,
        price,
        categoryId
      })
      res.status(200).json({
        status:'ok',
        msg:'Create advert success',
        data:postAdvertResult
      })

    } catch (err) {
      console.error(err)
      res.status(500).json({ status: 'err', msg: "Can't create advert" });
    }
  },
  
  putAdvert: async (req, res) => {
    const {id} = req.params   
    const newData = req.body
    console.log(newData)
  
   
   try {
    const updateAdvert = await advertModel.updateAdvert(
      newData,
      id,    
    )


    if(updateAdvert === 0){
      return res.status(404).json({
        status:'err',
        msg:'advert not found'
      })
    }
    if(updateAdvert === 'ERROR'){
      return res.status(500).json({
        status:'err',
        msg: "DB error"
      })
    }

    res.status(200).json({status:'ok', msg:'advert updated success'})
   } catch (error) {
    console.error(error)
   }
      
  },
  
  deleteAdvert: async (req, res) => {
    const {id} = req.params
    try {
      const deleteAdvert = await advertModel.deleteAdvert(
        id,
      )

      if(deleteAdvert === 0){
        res.status(404).json({status:'err', msg:'advert cannot be deleted' })
      }

      res.status(200).json({status:'ok', msg:'advert deleted success'})
    } catch (error) {
      console.error(error)
    }
  }
  
  
}
export { advertController }



