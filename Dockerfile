FROM node:20 AS build
WORKDIR /src/app
COPY . .
RUN npm i
RUN npm run build

FROM node:20
WORKDIR /src/app
COPY --from=build /src/app/public ./public
COPY --from=build /src/app/package.json ./package.json
COPY --from=build /src/app/package-lock.yaml ./package-lock.yaml
COPY --from=build /src/app/.next ./.next
COPY --from=build /src/app/node_modules ./node_modules
COPY --from=build /src/app/next.config.mjs ./next.config.mjs
EXPOSE 3000
RUN npm i
CMD ["npm", "run", "start"]