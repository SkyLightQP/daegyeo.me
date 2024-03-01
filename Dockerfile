FROM node:20-alpine AS base

FROM base AS builder

COPY / /workspace
WORKDIR /workspace

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN yarn && yarn build

USER node

FROM base AS runner

COPY --chown=node:node --from=builder /workspace/ ./

ENV NODE_ENV production
ENV TZ Asia/Seoul
EXPOSE 3000

CMD ["yarn", "start"]
