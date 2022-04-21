# Is it the most optimized? No, but it works for MVP so

FROM node:16-alpine
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

COPY . .
RUN rm -rf apps/api
RUN pnpm install 
RUN pnpm build:web

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start:web"]
