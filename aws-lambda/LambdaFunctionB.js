import {DynamoDBClient, QueryCommand} from '@aws-sdk/client-dynamodb';

// Initialize the DynamoDB Client with the target region
const dynamoClient = new DynamoDBClient({region: 'us-west-1'});

export async function handler(event) {
   // Parse the partition key from the http request body
   const id = JSON.parse(event.body ?? '{}').content_uuid;

   // DynamoDB QueryCommand parameters
   const params = {
      TableName: 'ContentExample',
      IndexName: 'content_uuid-index',
      KeyConditionExpression: 'content_uuid = :uuid',
      ExpressionAttributeValues: {
         ':uuid': {S: id},
      },
   };

   try {
      const {Items} = await dynamoClient.send(new QueryCommand(params));

      return {
         statusCode: 200,
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(
            Items.length > 0 ? Items : {message: 'Item not found'}
         ),
      };
   } catch (error) {
      console.error('DynamoDB error:', error);
      return {
         statusCode: 500,
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({message: 'Failed to fetch item'}),
      };
   }
}
