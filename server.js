import express, { response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import path from "path";
import router from "./src/routes/routes.js"
import {mongoConnect} from "./src/database/mongo.js"

dotenv.config();
mongoConnect()
const __dirname = path.resolve()
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);

  
  
app.use(cors())

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname ,'public' )))


app.use(express.json())


app.use('/' ,router)



server.listen(port , () => {
    console.log(`Serve conectado na porta ${port}`);
  
  })

