# Confi app

## Getting started

In order to run the code, first you need to fill out the missing/change existing variables in the `docker-compose.yml` file.

After setting the variables run

```
docker-compose up
```

which will spinup the dev server and create a default admin user with the credentials spcified in the docker-compose.yml.

After the successfull docker startup you will be able to access the swagger docs on

```
http://localhost:3000/api/
```

In order to run e2e tests run the following command
```
docker-compose -f docker-compose.e2e.yml up
```

In case of missing db error after swithcing between dev server and running tests, run
```
docker-compose down --volumes
```
and then run the desired operation.