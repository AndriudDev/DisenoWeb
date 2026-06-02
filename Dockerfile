# Etapa 1: deps (Dependencias)
# En esta fase se instalan todas las dependencias del proyecto usando yarn.lock para asegurar versiones exactas.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Etapa 2: build (Construcción)
# Se genera el cliente de Prisma y se compila el código TypeScript a JavaScript (dist).
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN yarn build

# Etapa 3: runner (Ejecución)
# Imagen final optimizada que solo contiene los archivos necesarios para correr la app en producción.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Solo copiamos lo estrictamente necesario para la ejecución
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated
COPY --from=build /app/generated ./dist/generated
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/views ./views
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/src/index.js"]
