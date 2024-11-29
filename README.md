# CORUM TEST

## Table of Contents

- [Installation](#installation)

## Installation

Make .env files with the following variables

Root
```dotenv
POSTGRES_USER: ''
POSTGRES_PASSWORD: ''
POSTGRES_DB: ''
```
Frontend
```dotenv
VITE_API_HOST=''
```
Backend
```dotenv
DATABASE_URL=''
JWT_SECRET_KEY=''
```
Make sure you have docker and compose installed and launch the containers like so:

```sh
docker compose up -d --build
```
