up:
	docker compose up -d

bind:
	docker compose exec bot bash

start: up bind

s:
	npm run dev

install:
	npm i