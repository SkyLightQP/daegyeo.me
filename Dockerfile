FROM node:18 as builder

COPY / /workspace
WORKDIR /workspace

ENV TZ Asia/Seoul
EXPOSE 3000

RUN yarn && yarn build

USER node

FROM node:18 as runner

COPY --chown=node:node --from=builder /workspace/ ./

ENV NODE_ENV production

CMD ["yarn", "prod"]
