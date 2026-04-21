# -- BUILD STAGE --
FROM node:22-alpine AS build
WORKDIR /app

# Copiar configuración de dependencias y empaquetar
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar el código fuente y compilar
COPY . .
RUN npm run build -- --configuration production

# -- RUNTIME STAGE --
FROM nginx:alpine

# Copiar configuración de NGINX personalizada
# Nota: Cloud Run por defecto usa el puerto 8080.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build the Angular
# Ajustar el nombre de la carpeta según la salida (el builder application en Angular 17+ crea subcarpetas)
COPY --from=build /app/dist/optima/browser /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]