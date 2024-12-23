// Dependencias
const morgan = require('morgan');
const express = require('express');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const redis = require('redis');
const soap = require('soap'); // SOAP
const taskRoutes = require('./routes/task');

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
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || '6379'}`
});

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
const soapUrl = process.env.SOAP_URL || 'http://api-soap:5000';
// **Endpoint REST para obtener un recurso por ID**
app.get('/api/resource/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Crear un cliente SOAP
        const client = await soap.createClientAsync(SOAP_URL);

        // Llamar al método de obtención en la API SOAP
        const [response] = await client.GetResourceByIdAsync({ id: parseInt(id, 10) });

        // Responder al cliente REST
        res.status(200).json({ data: response.GetResourceByIdResult });
    } catch (error) {
        console.error('Error al conectar con la API SOAP:', error);
        res.status(500).json({ error: 'Error al obtener el recurso en SOAP.' });
    }
});
// Rutas de empleados, pasamos el cliente de Redis como argumento
app.use("/empleados", empleados(client, soapUrl));
app.use('/task', taskRoutes);

// Middleware para rutas no encontradas
app.use(notFound);

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running...");
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
