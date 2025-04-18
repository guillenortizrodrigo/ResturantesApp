FROM node:22.13.1

# Crear carpeta de trabajo
WORKDIR /app/

# Copiar archivos
COPY . .

# Instalar dependencias
RUN yarn install

# Exponer el puerto en que corre Vite (por defecto 5173)
EXPOSE 5173

# Comando para levantar el server de desarrollo
CMD ["yarn", "dev", "--host"]
