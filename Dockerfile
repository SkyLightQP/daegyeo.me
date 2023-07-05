FROM node:18 as builder

COPY / /workspace
WORKDIR /workspace

ENV TZ Asia/Seoul
EXPOSE 3000

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN yarn && yarn build

USER node

FROM node:18 as runner

COPY --chown=node:node --from=builder /workspace/ ./

ENV NODE_ENV production

CMD ["yarn", "start"]
