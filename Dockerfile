FROM node:22-alpine3.21

WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY . ./
RUN pnpm build

CMD ["pnpm", "start"]