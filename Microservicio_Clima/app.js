const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const weatherRouter = require('./api/weather');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Bienvenido al microservicio de clima');
});

// Route to handle weather requests
app.use('/api', weatherRouter);

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Weather Microservice API',
            version: '1.0.0',
            description: 'Microservice to fetch weather information from various cities.'
        },
    },
    apis: ['./api/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
