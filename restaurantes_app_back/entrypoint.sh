#!/bin/bash

# Esperar a que la base esté lista
echo "Esperando a PostgreSQL..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "PostgreSQL listo, aplicando migraciones..."
python manage.py migrate

echo "Cargando datos iniciales..."
python manage.py loaddata datos.json || echo "No se cargó datos.json (puede que ya estén)"

exec "$@"
