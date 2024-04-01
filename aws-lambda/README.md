# Deploying the Lambda Function to AWS
This guide outlines the steps to deploy a Lambda function using the AWS CLI and briefly mentions setting up an API Gateway with Lambda proxy integration.

## Prerequisites
Ensure AWS CLI is installed. If not, install it by following the [official documentation](https://aws.amazon.com/cli/).

## Deploy the Lambda Function
#### 1. Package the Lambda Function
```bash
zip function.zip LambdaFunction.js
```
#### 2. Create the Lambda Function
Replace `YOUR_ACCOUNT_ID` with your AWS account ID and `YOUR_LAMBDA_EXECUTION_ROLE` with your IAM role ARN.

```bash
aws lambda create-function \
  --function-name DynamoDBProxyFunction \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/YOUR_LAMBDA_EXECUTION_ROLE \
  --handler LambdaFunction.handler \
  --zip-file fileb://function.zip \
  --region us-west-1
```
## API Gateway with Lambda Proxy
To expose the Lambda function via HTTP, set up an API Gateway with Lambda proxy integration. This setup allows the API Gateway to forward any HTTP method requests directly to the Lambda function.