import express from "express";
import { pgConnection } from "./database/postgresConnection.mjs";

import cors from 'cors'
import bodyParser from 'body-parser';

import { api } from '../server/routes/index.mjs'



const initDataBase = async () => {
  try {
    await pgConnection();
    console.log("DB init success");
  } catch (error) {
    console.error("DB init failure", error);
    process.exit(1);
  }
};
 
const startServer = async () => {
  await initDataBase();
  const PORT = 3001;
  const app = express();


  app.use(cors())
 app.use(bodyParser.json())


  app.get("/", (req, res) => {
    res.status(200).json({ status: 200, msg: "SERVER HOME PAGE..." });
  });

  

  app.use('/api', api)

  app.get("*", (req, res) => {
    res.status(200).json({ status: 200, msg: "SERVER NO PAGE 404" });
  });



  app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
};

startServer();
