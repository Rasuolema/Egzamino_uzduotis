import { pool } from "../database/postgresConnection.mjs";

const DbTestModel = {
  getAdvert: async () => {
    try {
      const result = await pool.query("SELECT * FROM advert");
   
      return result.rows;
    } catch (error) {
      console.error(error);
    }
  },
};

export { DbTestModel };
