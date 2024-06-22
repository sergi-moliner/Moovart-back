import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from './routes/testRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import localRoutes from './routes/localRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js'; 
import eventArtistRoutes from './routes/eventArtistRoutes.js';
import { testConnection } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configura el middleware CORS para que peuda recibir solicitudes de POST, PUT, DELETE, UPDATE, etc.
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}));

//header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Middleware para analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formularios en el cuerpo de la solicitud

// Configurar rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/test', testRoutes);
app.use('/artists', artistRoutes);
app.use('/locals', localRoutes);
app.use('/photos', photoRoutes);
app.use('/events', eventRoutes);
app.use('/portfolios', portfolioRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/notifications', notificationRoutes);
app.use('/event-artists', eventArtistRoutes); 

// Iniciar el servidor
app.listen(PORT, async () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
  await testConnection();
});
