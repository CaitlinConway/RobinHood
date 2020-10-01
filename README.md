# RobinHood

## Getting started
1. Clone this repository
2. Create a **.env** file based on the example with proper settings for your development environment
3. Follow instructions in the [`starter_app/README.md`](./starter_app/README.md) to setup your development Back-End.
4. Follow instructions in the [`client/README.md`](./client/README.md) to set up your development Front-End.
## Deploying to Heroku
### Prepping Your Heroku Project
1. Create a new project on your Heroku Dashboard.
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) if you haven't already.
4. Add any Config Vars to your heroku app, either on the Heroku CLI, or on the heroku-app dashboard's Settings tab.
### Prepping Your React App:
1. Run `npm run build` in your React app root folder.
    * This will build the static files for your React app.
    * The `postbuild` script from your `package.json` will _automatically_ move them into the `/static` directory in your flask files.
### Prepping your Flask App:
1. Enter your pipenv: `pipenv shell`
1. Update your requirements.txt with all of the packages installed in the environemt: `pip freeze > requirements.txt`
### Pushing your container
1. Login to heroku: `$ heroku login`
2. Login to the heroku container registry: `$ heroku container:login`
3. CD into `starter_app` and push your `Dockerfile` to heroku (this will build the Flask Dockerfile, and push): `$ heroku container:push web -a {NAME_OF_HEROKU_APP}`
5. Release your docker container to heroku: `$ heroku container:release web -a {NAME_OF_HEROKU_APP}`
6. Set up your database: `heroku run -a {NAME_OF_HEROKU_APP} {your_migration_script_here}`
7. Profit.
