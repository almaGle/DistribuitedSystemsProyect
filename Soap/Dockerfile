# Base image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copiar archivos de la API SOAP
COPY . .

# Restaurar paquetes e instalar dependencias
RUN dotnet restore

# Compilar la aplicación
RUN dotnet build -c Release -o /out

# Publicar la aplicación
RUN dotnet publish -c Release -o /out

# Imagen final
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /out .

# Exponer el puerto de la API SOAP
EXPOSE 5000

# Iniciar la API SOAP
ENTRYPOINT ["dotnet", "api-soap.dll"]
