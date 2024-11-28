# Base image
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código de la API
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 4000

# Iniciar la API REST
CMD ["npm", "start"]
