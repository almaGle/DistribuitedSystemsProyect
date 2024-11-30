# Base image
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install
RUN apt-get update && apt-get install -y default-mysql-client


# Copiar el código de la API
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 4000

# Iniciar la API REST
CMD ["npm", "start"]
