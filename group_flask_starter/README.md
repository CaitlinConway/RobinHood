# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository
2. Create a **.env** file based on the example with proper settings for your development environment
3. Follow instructions in the [`starter_app/README.md`](./starter_app/README.md) to setup your development Back-End.
4. Follow instructions in the [`client/README.md`](./client/README.md) to set up your development Front-End.

## Deploy to Heroku

1. Create a new project
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run `$ heroku login`
5. Login to the heroku container registry `$ heroku container:login`
6. CD into `starter_app` and push your backend docker container to heroku (this will build the Flask dockerfile, and push) `$ heroku container:push web -a {NAME_OF_HEROKU_APP}`
7. CD into `client` and push your backend docker container to heroku (this will build the Flask dockerfile, and push) `$ heroku container:push web -a {NAME_OF_HEROKU_APP}`
8. Release your docker container to heroku `$ heroku container:release web -a {NAME_OF_HEROKU_APP}`
9. set up your database:
```bash
    $ heroku run -a {NAME_OF_HEROKU_APP} python -m database
```
10. profit
