# Deploy to Heroku

1. Create a new project on Heroku.
2. Under Resources click "Find more add-ons" and add the add-on called "Heroku Postgres".
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).
4. Run:

   ```bash
   pipenv lock -r > requirements.txt
   heroku login
   ```
5. Login to the heroku container registry.

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://persistamp.herokuapp.com".
   *NOTE* Make sure there is no trailing slash!
   
7. Push your docker container to Heroku from the root directory of your project.
   This will build the `Dockerfile` and push the image to your Heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to Heroku.

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. Set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} python seeder.py
   
   # Note, we should do it this way to be better, but we made it into a seeder.py instead oops
   # heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings, find "Config Vars". Add any additional/secret `.env` variables.

11. profit

Thanks to Instructor Bart Dorsey! 💓