// swagger/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API GEOTASK',
    version: '1.0.0',
    description: 'Documentación Swagger de la app GEOTASK con tareas, usuarios y ubicaciones.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },  
  }, 
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./router/*.js'], // Asegúrate que esto apunte correctamente a tus rutas
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
