import express from 'express';
const app = express();
import router from './routes.js';
import fs from 'fs';
import cors from 'cors';
import https from 'https';

app.use(express.json()); 
app.use(cors());
app.use(router);

app.listen(3000, () => console.log("API rodando na porta 3000"));

https.createServer({
  cert: fs.readFileSync('src/SSL/code.crt'),
  key:  fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, ()=> {
  console.log("Api rodando em https na porta 3001");
  });