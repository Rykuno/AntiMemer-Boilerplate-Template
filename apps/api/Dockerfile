# Is it the most optimized? No, but it works for MVP so shutup

FROM node:16-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY . .
RUN rm -rf apps/web
RUN pnpm install 
RUN pnpm api:generate 
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env echo /etc/secrets/.env > apps/api/.env
RUN mv .env apps/api/.env
RUN cat apps/api/.env
RUN pnpm api:build
RUN pnpm api:migrate

EXPOSE 80

ENV PORT 80

CMD ["pnpm", "api:start"]
