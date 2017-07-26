a?=''
export UID := $(shell id -u)
export GID := $(shell id -g)

# starts the docker containers
start:
	docker-compose up

# installs dependecies
install-deps:
	npm install

# installs/setups loopback image and loopback-cli scaffolding
setup-loopback:
	docker-compose run api lb

# loopback db migrate script
migrate:
	docker-compose run api node __scripts__/migrate.js

# loopback scaffolding helpers
api:
	docker-compose run api lb $(a)
model:
	docker-compose run api lb model $(a)
relation:
	docker-compose run api lb relation

# deletes loopback scaffolding
NUKE:
	rm -rf client node_modules server .eslintignore .gitignore .yo-rc.json package.json package-lock.json
