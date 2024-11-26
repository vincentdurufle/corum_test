# CORUM TEST

## Table of Contents

- [Installation](#installation)

## Installation

Make a .env file at the root of the project with the following variables

```dotenv
POSTGRES_USER: ''
POSTGRES_PASSWORD: ''
POSTGRES_DB: ''
```

Make sure you have docker and compose installed and launch the containers like so:

```sh
docker compose up -d --build
```
