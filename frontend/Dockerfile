# Development stage
FROM node:23-alpine AS development

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Production stage
FROM node:23-alpine AS production
ARG NEXT_PUBLIC_BACKEND_API
ENV NEXT_PUBLIC_BACKEND_API=${NEXT_PUBLIC_BACKEND_API}
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]