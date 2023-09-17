FROM node:18

ENV NODE_ENV=production

ARG API_URI=http://localhost:3001
ENV REACT_APP_API_URI $API_URI

ARG API_TIMEOUT=5000
ENV REACT_APP_API_TIMEOUT $API_TIMEOUT

WORKDIR /srv/app

RUN npm install -g pnpm

RUN chown node:node .

USER node

# Node has the uid 1000
COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node ./ ./

# Build api
RUN pnpm build

# Prunes devDependencies
RUN pnpm install --production --ignore-scripts --prefer-offline

CMD pnpm start