# Builder stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Vérifier le contenu (temporaire pour debug)
RUN ls -la dist/
RUN ls -la dist/frontend/ || echo "frontend folder not found"

# Nginx stage
FROM nginx:alpine
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]