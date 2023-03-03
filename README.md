# daegyeo.me [![CodeFactor](https://www.codefactor.io/repository/github/skylightqp/daegyeo.me/badge)](https://www.codefactor.io/repository/github/skylightqp/daegyeo.me)

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

- Require PostgreSQL and Firebase for database and authentication.
- PostgreSQL is used to store portfolio contents.

```shell
cp .env.example .env
```

```
DB_USERNAME=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=resume

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

## License
[`MIT License`](https://github.com/SkyLightQP/daegyeo.me/blob/main/LICENSE)
