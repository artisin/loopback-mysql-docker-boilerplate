# Loopback & MySQL Docker Boilerplate

## About

__Description__:

A Base docker project to get up and running with [Loopback](http://loopback.io) and [MySQL](https://www.mysql.com/). This project also includes boot scripts located in `server/boot` to automatically do database migration/update so that you can move a bit quicker with your schema, tables, and data structures. Apart from the migration scripts this project is a fresh sheet of ice, in that, there are no models, widgets, relations, or permissions set up.

__Tech Specifications__:

Node: `6.11.1` -> Latest LTS: Boron
StrongLoop: `3.x`
MySQL: `5.6` -> [Amazon Aurora DB](https://aws.amazon.com/rds/aurora/) drop-in at 1/10th of the cost!

## Install/Set Up

__Prerequisites__:

You need to have both [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/) installed.

__Notes__:

Number one, I've created a make file to make life a bit easier. Number two, if you wish to do a complete fresh install, as in, remove all the current loopback scaffolding you can do so via:

```bash
   # deletes all loopback scaffolding
   make NUKE
   # loopback-cli scaffolding
   make setup-loopback
```

__1) Install Dependencies__:

First task of business is to install the npm dependencies:

```bash
   npm install
   # or use the make script
   make install-deps
```

__2) Start docker-compose__

Last task of business is to boot up the docker containers:

```bash
   make start # runs -> docker-compose up
```

__3) Open Browser__

To make sure everything worked according to plan open open [`localhost:3002`](http://localhost:3002/). It should display a simple JSON Object with a `"started"` and `"uptime"` property. To view the api cruz on over to [`localhost:3002/explorer/`](http://localhost:3002/explorer/).


## Create Model

To create a new loopback model:

```bash
   make model a=Widget
```

IMPORTANT: After you create a new model you will have to perform a db migration which you can read about bellow.

## Database Migration

For the most part db migration is automated through the boot scripts but you'll have to update the script accordingly. Let's say we create a new model, then we will have to edit the `/server/boot/migration.custom.js` file and add the new model to the `MODELS` Array in String format. However, if you add a alter/add the `properties` on a model the migration script will automaticaly sync up the new schema.

You can also do a db migration via `/__scripts__/migrate.js` and like the automated scripts you will have to add your custom models to the `MODELS` Array. You can then run this script via: `make migrate`.

## Loopback Make Commands

There are a few Makefile commands to make life a bit easier. Nothing magical just a wrapper around `docker-compose run api lb`. You must pass an argument to the `api` and `model` command.

__api__

```bash
   make api a=middleware
   make api a='Model Widget'
```

__model__

```bash
   make model a=Widget
```


__Relation -> (no arguments)__

```bash
   make relation
```


## Debug Node

To spawn a node inspect debugger within the container you must un-comment the debug port and debug command in the `docker-compose.yml` file like so:

```yaml
api:
  ports:
    - 3002:3000
    # Debug port
    - 9229:9229
  # command: nodemon . -> comment out default command
  command: nodemon -L --inspect .
```

## MySQL Environment

The MySQL docker image is setup via `environment` variables to set up the the db. These variables are set in the root `.env` file. Remember, these variables must correspond with `/server/datasources.json`.


---

Best, te
