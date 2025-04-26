# Utilise l'image officielle Node.js
FROM node:18

# Crée un dossier app
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code dans le conteneur
COPY . .

# Expose le port
EXPOSE 5000

# Démarre le serveur
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi"]

