import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocumentClient, GetCommand} from '@aws-sdk/lib-dynamodb';

// Initialize the DynamoDB Client with the target region
const dynamoClient = new DynamoDBClient({region: 'us-west-1'});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

export async function handler(event) {
   // Parse the partition key from the http request body
   const id = JSON.parse(event.body ?? '{}').partition_key;

   // DynamoDB GetItem parameters
   const params = {
      TableName: 'YahooExample',
      Key: {
         partition_key: id,
      },
   };

   try {
      const {Item} = await docClient.send(new GetCommand(params));

      return Item
         ? {statusCode: 200, body: JSON.stringify(Item)}
         : {statusCode: 404, body: JSON.stringify({message: 'Item not found'})};
   } catch (error) {
      console.error('DynamoDB error:', error);
      return {
         statusCode: 500,
         body: JSON.stringify({message: 'Failed to fetch item'}),
      };
   }
}
