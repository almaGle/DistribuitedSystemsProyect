const express = require('express');
const router = express.Router();
const { createTaskInSoap, listTasksFromSoap } = require('../rest_client');

// Ruta para crear una tarea
router.post('/task', async (req, res) => {
    const { title, description, assignedTo } = req.body;

    try {
        const soapResponse = await createTaskInSoap(title, description, assignedTo);
        res.status(201).json({ message: "Task created in SOAP API", soapResponse });
    } catch (error) {
        res.status(500).json({ error: "Error while creating task in SOAP API" });
    }
});

// Ruta para listar tareas
router.get('/task', async (req, res) => {
    try {
        const tasks = await listTasksFromSoap();
        res.status(200).send(tasks); // Devuelve la lista de tareas
    } catch (error) {
        res.status(500).json({ error: "Error while fetching tasks from SOAP API" });
    }
});

module.exports = router;
