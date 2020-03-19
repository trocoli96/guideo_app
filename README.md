# Welcome to The Guideo Project!


## Backend installation guide:

Requirements: Node (version 10+), Npm and docker


1) Add Laradock in /guideo-app

git clone https://github.com/laradock/laradock

2) Enter in the laradock folder

cd laradock

..then copy the env-example file

cp env-example .env

3) Change in the .env file the following line

APP_CODE_PATH_HOST=../backend-api

4) Run docker-compose

sudo docker-compose up -d nginx mysql


## Frontend installation guide:

yarn install

yarn start

