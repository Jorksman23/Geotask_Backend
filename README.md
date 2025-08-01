# GeoTask Manager - Backend
API RESTful desarrollada con Node.js + Express, diseñada para gestionar tareas geolocalizadas,
es decir está enfocada en la gestión inteligente de tareas basada en la geolocalización.
## Características Principales
Encriptación de contraseñas con bcrypt
Middleware de protección de rutas
Preparado para trabajar con Google Maps desde el frontend
Compatible con Railway
## Requisitos
Node.js v18+
npm v9+
## Instalación
1. Clonar el repositorio
   git clone https://github.com/Jorksman23/Geotask_Backend.git

   cd geotask-backend
2. Instalar dependencias
   npm install o npm i
3. Inicia el servidor en desarrollo
   npm run dev
## Variables de entorno
PORT (Puerto en el que corre la API)
DB_CONNECTION (Tipo de base de Datos a utilizar)
DB_HOST (Dirección del servidor de base de datos)
DB_PORT (Puerto del servidor de base de datos)
DB_DATABASE (Nombre de la Base de Datos)
DB_USERNAME (usuario con Acceso a la base de datos)
DB_PASSWORD (Contraseña del usuario de la base de datos) 
TOKEN_KEY (Clave secreta para firmar tokens JWT)
## Script 
npm run dev inicia el servidor con nodemon
npm start inicia en modo producción



<pre> ```mermaid graph TD A[App Móvil - Ionic Angular] -->|API REST| B(Backend Node.js Express) B --> C[(MongoDB Atlas)] B --> D[Google Maps API] ``` </pre>

## Arquitectura del Sistema

```mermaid
graph TD
    A[App Móvil - Ionic Angular] -->|API REST| B(Backend Node.js Express)
    B --> C[(MongoDB Atlas)]
    B --> D[Google Maps API]
