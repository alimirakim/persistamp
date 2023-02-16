FROM node:12 AS build-stage

WORKDIR /frontend
COPY frontend/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://persistamp.herokuapp.com

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.8

# Setup Flask environment
ENV FLASK_APP=__init__
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /frontend/build/* backend/static/

# Install Python Dependencies
RUN pip install -r backend/requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn backend:__init__
