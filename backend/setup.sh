#!/bin/bash

# Instalar Yarn globalmente
npm install -g yarn

# Usar Yarn para instalar dependencias
yarn add bcrypt
yarn add @types/bcrypt -D
yarn add nodemon -D
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D
yarn add prisma @prisma/client

# Instalar pnpm y Prisma globalmente
npm install -g pnpm
npm install -g prisma

# Instalar librerias para testing
yarn add --dev jest
yarn create jest
yarn add --dev babel-jest @babel/core @babel/preset-env
yarn add --dev @babel/preset-typescript
yarn add --dev ts-jest
yarn add --dev @jest/globals
yarn add supertest --dev

echo "Instalación completada."
