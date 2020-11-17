# Kan-Ban Web Game


<!-- badges -->
![Current board-app version](https://img.shields.io/badge/current%20version-1.0.0-blue)

![GitHub repo size](https://img.shields.io/github/repo-size/leetheperm/Q3Hackathon-kanBan)

![MIT license](https://img.shields.io/badge/license-MIT-lightgrey)

![NPM dependencies - React](https://img.shields.io/npm/v/react?label=react)

![Open issues on github](https://img.shields.io/github/issues/leetheperm/q3hackathon-kanban)

## Version 1.0.0

- [x] Rollable dice
- [x] Auto-counted subscribers
- [x] Cycle day counter
- [x] Daily alerts when required
- [x] Able to move employees to other teams
- [x] Set of rules

## Dockerizing container for devs

To dockerize Kanbanatics first build your image
```
docker build -t board-app:dev .
```

Then run with this command from the board-app directory once the image is built

```
 docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true board-app:dev
```
## Future updates

- [ ] Heroku deployed instance available online
- [x] CSS is neatly formatted
- [ ] Finance caluclator module added
- [ ] Cypress E2E tests

## Objective

Create Kan-Ban style web-app game with a fixed scenario of teams and agile stories

## Last updated

12th November 2020

## Contributors

* **Lee Davies** - *DevOpsTest* - (https://github.com/LeethePerm)
* **Harry Black** - *Main developer* - (https://github.com/felination)
* **Benjamin Frost** - * Project manager* - (TBC)
* **Silvia Lee** - * Front end development - (https://github.com/silviatheweasel)

