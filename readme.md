# Proyecto Distribuidos - Sistema de APIs con Docker Compose y Kubernetes

Este proyecto tiene como objetivo desplegar un conjunto de APIs (REST y SOAP) que interactúan con bases de datos MySQL y Redis, tanto en un entorno local con Docker Compose como en un entorno Kubernetes con Minikube.

## Requisitos

### 1. Docker Compose
- **Docker** y **Docker Compose** instalados en tu máquina.
- **Minikube** (opcional, para pruebas en Kubernetes).
- **kubectl** (si se va a usar Kubernetes).
- Acceso a internet para descargar las imágenes de Docker necesarias.

### 2. Kubernetes (Minikube)
- **Minikube** instalado y funcionando (si deseas probar en Kubernetes local).
- **kubectl** para interactuar con el clúster Kubernetes.
- Imágenes de Docker deben ser subidas a un registro local (Minikube) para que las pueda usar.

## Estructura del Proyecto

- `docker-compose.yml` : Configuración de Docker Compose para levantar todos los servicios (MySQL, Redis, REST API, SOAP API).
- `Rest/` : Código fuente para la API REST.
- `Soap/` : Código fuente para la API SOAP.
- `Kubernetes/` : Archivos YAML para desplegar los servicios en Kubernetes.

## Instrucciones de Despliegue

### **1. Despliegue con Docker Compose**

Para levantar todos los servicios usando Docker Compose, sigue estos pasos:

1. **Clona el repositorio**:
Entra en la consola desde la carpeta donde se desea clonar el repositorio
    ```bash
    
    git clone https://github.com/almaGle/DistribuitedSystemsProyect
    
    ```
cd <directorio-de-donde-se-clonó-el-repositorio>
2. **Construir las imágenes Docker**:
    Asegúrate de que los `Dockerfile` en las carpetas `Rest/` y `Soap/` estén configurados correctamente. Luego, ejecuta el siguiente comando en la raíz del proyecto:
    ```bash
    docker-compose build
    ```

3. **Levantar los servicios**:
    Ejecuta el siguiente comando para levantar los servicios:
    ```bash
    docker-compose up -d
    ```

4. **Verifica los contenedores**:
    Asegúrate de que todos los servicios estén corriendo:
    ```bash
    docker ps
    ```

5. **Acceso a las APIs**:
    - La API REST estará disponible en [http://localhost:4000](http://localhost:4000).
    - La API SOAP estará disponible en [http://localhost:5000](http://localhost:5000).

6. **Para detener los contenedores**:
    ```bash
    docker-compose down
    ```





### **Despliegue con Kubernetes**

Para desplegar el proyecto en un entorno Kubernetes usando **Minikube**, sigue estos pasos:

#### **Paso 1: Preparar Minikube**

Si no tienes Minikube instalado, puedes instalarlo desde [aquí](https://minikube.sigs.k8s.io/docs/). Luego, inicia Minikube con:
     ```bash
    minikube start
    ```

### **Paso 2: Crear los Namespaces en Kubernetes**

Para organizar los servicios, vamos a crear tres namespaces:

**acge-api** para los servicios principales (API REST y Redis).
**lfbt-api** para la API SOAP.
db para las bases de datos (MySQL y Redis).
Aplica los siguientes archivos YAML:

    ```bash
    kubectl apply -f /namespace
    ```

### **Paso 3: Subir las Imágenes a Minikube**

Primero, construye las imágenes usando Docker en el contexto de Minikube:

    ```bash

    eval $(minikube -p minikube docker-env)
    ```

Luego, construye las imágenes para las APIs REST y SOAP:

    ```bash

    docker build -t rest-api:1 ./Rest
    docker build -t soap-api:1 ./Soap
    ```

### **Paso 4: Aplicar los Archivos YAML de Kubernetes**
Los archivos YAML en la carpeta k8s/ están configurados para desplegar los servicios en el clúster de Minikube.

Aplica los siguientes archivos:

    ```bash
    kubectl apply -f Rest/k8s
    kubectl apply -f Soap/k8s
    ```
### **Paso 5: Verificar el Despliegue**
Verifica el estado de los pods:

    ```bash

    kubectl get pods -n acge-api
    kubectl get pods -n lfbt-api
    kubectl get pods -n databases
    ```
## **Paso 6: Exponer las APIs (si es necesario)**

Si quieres acceder a las APIs desde fuera del clúster de Minikube, puedes exponer los servicios usando kubectl port-forward o crear un LoadBalancer:

    ```bash

    kubectl port-forward service/rest-api 4000:4000 -n acge-api
    kubectl port-forward service/soap-api 5000:5000 -n lfbt-api
    ```

Esto hará que las APIs sean accesibles en tu máquina local en los puertos 4000 y 5000 respectivamente.


## **Dependencias y APIs externas**

**MySQL**: La base de datos MySQL es requerida por la API REST. Las credenciales se pasan a través de variables de entorno configuradas en los Deployments.
**Redis**: Redis se usa como sistema de caché para la API REST.
**SOAP API**: La API SOAP está disponible en el contenedor correspondiente y se conecta a PostgreSQL.
