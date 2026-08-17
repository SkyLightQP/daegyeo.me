# daegyeo.me [![deploy-web](https://github.com/SkyLightQP/daegyeo.me/actions/workflows/deploy-web.yml/badge.svg?branch=main)](https://github.com/SkyLightQP/daegyeo.me/actions/workflows/deploy-web.yml) [![CodeFactor](https://www.codefactor.io/repository/github/skylightqp/daegyeo.me/badge)](https://www.codefactor.io/repository/github/skylightqp/daegyeo.me) 

- [daegyeo.me](https://daegyeo.me/)
- [skylightqp.kr](https://skylightqp.kr/)

## Getting Started

- Use yarn package manager to start the project.

```shell
# Install dependencies
yarn install

# Start the project with development mode
yarn start

# Build the project and start this with production mode
yarn build
yarn prod
```  

### Using Docker
```shell
# Build docker image (you can change tag or container name.)
docker build -t resume .

# Run docker container
docker run -d -p 3000:3000 --env-file=.env --restart=unless-stopeed resume
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
