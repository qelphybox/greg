up:
	docker compose up -d

bind:
	docker compose exec bot bash

start: up bind

s:
	npm run dev

install:
	npm i

heroku-add-remote:
	heroku git:remote -a greg-invoicer

heroku-deploy!:
	git push heroku HEAD:main
