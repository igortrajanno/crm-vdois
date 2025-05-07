#!/bin/bash

# 🚀 Script de inicialização do CRM completo (frontend + backend)
# Executa build do frontend, sobe containers com Docker Compose

set -e

echo "🔧 Iniciando build do frontend..."
cd crm-frontend
npm install
npm run build
cd ..

echo "🐳 Subindo containers Docker..."
docker-compose down
docker-compose up --build -d

echo "✅ Sistema iniciado com sucesso! Acesse: http://localhost"
