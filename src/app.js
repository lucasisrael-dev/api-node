import express from 'express';
const app = express();
import router from './routes.js';

app.use(express.json()); 

app.use(router);

app.listen(3000, () => console.log("API rodando na porta 3000"));