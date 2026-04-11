# daegyeo.me [![deploy-web](https://github.com/SkyLightQP/daegyeo.me/actions/workflows/deploy-web.yml/badge.svg?branch=main)](https://github.com/SkyLightQP/daegyeo.me/actions/workflows/deploy-web.yml) [![CodeFactor](https://www.codefactor.io/repository/github/skylightqp/daegyeo.me/badge)](https://www.codefactor.io/repository/github/skylightqp/daegyeo.me)

- [daegyeo.me](https://daegyeo.me/)
- [skylightqp.kr](https://skylightqp.kr/)

## Getting Started

- Use pnpm package manager to start the project.

```shell
# Install dependencies
pnpm install

# Start the project with development mode
pnpm dev

# Build the project and start this with production mode
pnpm build
pnpm start
```

### Using Docker

```shell
# Build docker image (you can change tag or container name.)
DOCKER_BUILDKIT=1 docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=example-anon-key \
  -t resume .

# Run docker container
docker run -d -p 3000:3000 --env-file=.env --restart=unless-stopped resume
```

## Environment Variables

- Require Supabase API key for database and authentication.

```shell
cp .env.example .env
```

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## License

[`MIT License`](https://github.com/SkyLightQP/daegyeo.me/blob/main/LICENSE)
