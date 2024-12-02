const axios = require('axios');
const xml2js = require('xml2js'); // Para parsear el XML a un objeto JavaScript

const SOAP_API_URL = process.env.SOAP_API_URL || "http://api-soap:5000";

// Función para parsear XML a JSON
function parseXmlToJson(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                reject("Error al parsear el XML");
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Crea una tarea en la API SOAP.
 * @param {string} title - Título de la tarea.
 * @param {string} description - Descripción de la tarea.
 * @param {number} assignedTo - ID del empleado asignado.
 * @returns {Promise<object>} - Respuesta del servicio SOAP en formato JSON.
 */
// Función para crear tarea en la API SOAP
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
            headers: {
                "Content-Type": "text/xml"
            }
        });
        // Procesa la respuesta, si es necesario
        return response.data;  // Devuelve la respuesta SOAP en formato JSON o XML
    } catch (error) {
        console.error("Error al llamar al servicio SOAP:", error.message);
        throw error;
    }
}

/**
 * Obtiene la lista de tareas desde la API SOAP.
 * @returns {Promise<object>} - Lista de tareas en formato JSON.
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
        const jsonResponse = await parseXmlToJson(response.data);
        return jsonResponse; // Devuelve las tareas en formato JSON
    } catch (error) {
        console.error("Error al obtener tareas de la API SOAP:", error.message);
        throw error;
    }
}

module.exports = { createTaskInSoap, listTasksFromSoap };
