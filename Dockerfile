FROM node:16 as builder

COPY / /workspace
WORKDIR /workspace

ENV TZ Asia/Seoul
EXPOSE 3000

RUN yarn && yarn build

ENV NODE_ENV production
USER node

FROM node:16 as runner

COPY --chown=node:node --from=builder /workspace/node_modules ./node_modules
COPY --chown=node:node --from=builder /workspace/.next ./.next

CMD ["yarn", "start"]
