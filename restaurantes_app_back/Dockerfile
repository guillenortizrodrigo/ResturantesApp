# Imagen base de Python
FROM python:3.11

# Evita archivos .pyc y mejora logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Crea carpeta de trabajo
WORKDIR /app

# Copia todos los archivos del backend al contenedor
COPY . .

# Instala pip y las dependencias del proyecto
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expone el puerto de Django
EXPOSE 8000

# Comando por defecto para desarrollo
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
