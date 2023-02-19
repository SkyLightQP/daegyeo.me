# daegyeo.me

> My Portfolio for Daegyeom Ha

- [daegyeo.me](https://daegyeo.me/)
- [skylightqp.kr](https://skylightqp.kr/)

## Getting Started

- Use yarn package manager to start the project. (with development mode)

```shell
# Install dependencies
yarn install

# Start project with development mode
yarn start

# Build project and start with production mode
yarn build
yarn prod
```  

### Using Docker
```shell
# Build docker image (change tag name)
docker build -t resume .

# Run docker container
docker run -d -p 3000:3000 --env-file .env resume
```

## Environment Variables

- Require Postgresql and Firebase for database and authentication.

```shell
cp .env.example .env
```

```
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

## License
[`MIT License`](https://github.com/SkyLightQP/resume/blob/master/LICENSE)
