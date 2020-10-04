FROM nikolaik/python-nodejs:python3.8-nodejs14 as base
WORKDIR /var/www
COPY . .
# Install Python Dependencies
RUN ["pip", "install", "-r", "requirements.txt"]
# Move our react build for Flask to serve
# Use cp here because we're copying files inside our working directory, not from
# our host machine.
RUN ["cp", "-r", "app/static/static/js", "app/static"]
RUN ["cp", "-r", "app/static/static/css", "app/static"]
# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
EXPOSE 8000
# Run flask environment
CMD gunicorn app:app
