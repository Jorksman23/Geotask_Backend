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


## Arquitectura del Sistema
```mermaid
graph TD
    A[App Móvil - Ionic Angular] -->|API REST| B(Backend Node.js Express)
    B --> C[(MySQL)]
    B --> D[Servicios de Autenticación (JWT)]
    A --> E[Geolocalización nativa (Capacitor)]
    A --> F[Mapbox GL JS]

 ```
## 🧩 Diagrama de Arquitectura del Backend

graph TD
    A[index.js (Servidor Principal)] --> B[Router]
    B --> B1[AuthRouter.js]
    B --> B2[UserRouter.js]
    B --> B3[TaskRouter.js]
    B --> B4[LocationRouter.js]

    A --> C[Middleware]
    C --> C1[authMiddleware]
    C --> C2[errorHandler]

    B1 --> D1[AuthController.js]
    B2 --> D2[UserController.js]
    B3 --> D3[TaskController.js]
    B4 --> D4[LocationController.js]

    D1 --> E1[UserModel.js]
    D2 --> E1
    D3 --> E2[TaskModel.js]
    D4 --> E3[LocationModel.js]

    A --> F[Swagger Docs]
    A --> G[conexion.js (MySQL)]

    G --> H[Base de Datos MySQL]
