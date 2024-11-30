const axios = require('axios'); // Asegúrate de tener axios instalado (npm install axios)

// Configuración de la URL base de la API SOAP desde el entorno o valores por defecto
const SOAP_API_URL = process.env.SOAP_API_URL || "http://soap-service:5000";

/**
 * Crea una tarea en la API SOAP.
 * @param {string} title - Título de la tarea.
 * @param {string} description - Descripción de la tarea.
 * @param {number} assignedTo - ID del empleado asignado.
 * @returns {Promise<string>} - Respuesta del servicio SOAP.
 */
async function createTaskInSoap(title, description, assignedTo) {
    const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="soap.api">
            <soapenv:Header/>
            <soapenv:Body>
                <soap:create_task>
                    <soap:title>${title}</soap:title>
                    <soap:description>${description}</soap:description>
                    <soap:assigned_to>${assignedTo}</soap:assigned_to>
                </soap:create_task>
            </soapenv:Body>
        </soapenv:Envelope>
    `;

    try {
        const response = await axios.post(SOAP_API_URL, soapRequest, {
            headers: { "Content-Type": "text/xml" },
        });
        return response.data; // Devuelve la respuesta XML del servicio SOAP
    } catch (error) {
        console.error("Error al llamar a la API SOAP:", error.message);
        throw error; // Lanza el error para que pueda manejarse en el flujo de la API REST
    }
}

/**
 * Obtiene la lista de tareas desde la API SOAP.
 * @returns {Promise<string>} - Respuesta del servicio SOAP (lista de tareas).
 */
async function listTasksFromSoap() {
    const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="soap.api">
            <soapenv:Header/>
            <soapenv:Body>
                <soap:list_tasks/>
            </soapenv:Body>
        </soapenv:Envelope>
    `;

    try {
        const response = await axios.post(SOAP_API_URL, soapRequest, {
            headers: { "Content-Type": "text/xml" },
        });
        return response.data; // Devuelve la respuesta XML del servicio SOAP
    } catch (error) {
        console.error("Error al obtener tareas de la API SOAP:", error.message);
        throw error;
    }
}

// Exporta las funciones para usarlas en otras partes de tu API REST
module.exports = { createTaskInSoap, listTasksFromSoap };
