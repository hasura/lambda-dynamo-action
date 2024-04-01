
## Start Hasura and Postgres

```
docker-compose up -d
```

## Apply Migrations

```
cd hasura
hasura migrate apply
hasura metadata apply
```

## Run Lambda Function
See [Deploying the Lambda Function to AWS](./aws-lambda/README.md)
