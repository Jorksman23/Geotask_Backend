
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import  { RouterUsuer } from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";
import AuthRouter from './router/AuthRouter.js';

import "./models/LocationModel.js";
import { RouterLocation } from './router/LocationRouter.js';

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',AuthRouter);

app.use('/api', RouterUsuer);
app.use('/api',RouterLocation)

app.use(cors({
    origin: 'http://localhost:8100', // o la URL de tu frontend
  credentials: true
}));

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

