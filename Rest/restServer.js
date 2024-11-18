const express = require('express');
const soap = require('soap');
const app = express();
app.use(express.json());

const soapUrl = 'http://localhost:8001/wsdl';

// Endpoint REST para crear un recurso
app.post('/create', async (req, res) => {
  try {
    const client = await soap.createClientAsync(soapUrl);
    const response = await client.CreateResourceAsync({ data: req.body.data });
    res.json(response[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al crear recurso');
  }
});

// Endpoint REST para obtener un recurso por ID
app.get('/resource/:id', async (req, res) => {
  try {
    const client = await soap.createClientAsync(soapUrl);
    const response = await client.GetResourceByIdAsync({ id: req.params.id });
    res.json(response[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al obtener recurso');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API REST corriendo en http://localhost:${PORT}`);
});
