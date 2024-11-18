// Dependencias
const morgan = require('morgan');
const express = require('express');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const redis = require('redis');
const soap = require('soap'); // SOAP

// Routers
const empleados = require('./routes/empleados');

// Middleware
const welcome = require('./middleware/welcome');
const notFound = require('./middleware/notFound');

// Inicialización de Express
const app = express();

// Configurar Swagger como middleware para la documentación de API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Puerto de la aplicación
const PORT = process.env.PORT || 4000;

// Middleware para logging y parseo de JSON
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear cliente de Redis
const client = redis.createClient({ url: 'redis://redis:6379' });

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

// Conectar a Redis de forma asíncrona
(async () => {
    await client.connect();
})();

// Ruta de bienvenida
app.get("/", welcome);

// **Integración con la API SOAP**
const soapUrl = process.env.SOAP_URL || 'http://soap-api-service.team-api.svc.cluster.local/wsdl';

// Rutas de empleados, pasamos el cliente de Redis como argumento
app.use("/empleados", empleados(client, soapUrl));

// Middleware para rutas no encontradas
app.use(notFound);

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running...");
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
