import { 
    SSMClient, 
    GetParameterCommand,
    SSMServiceException 
  } from "@aws-sdk/client-ssm";
  import { NextResponse } from 'next/server';
  
  const client = new SSMClient({
    region: process.env.AWS_REGION || 'us-east-1'
  });
  
  export async function GET() {
    try {
      const command = new GetParameterCommand({
        Name: "/amplify/shared/ds105sit0lppb/foo", 
        WithDecryption: true 
      });
  
      console.log('Attempting to fetch secret from parameter store...');
      const response = await client.send(command);

      console.log('Secret fetched successfully');
      console.log('SecretString:', response.Parameter?.Value);
      
      return NextResponse.json({
        success: true,
        message: 'Successfully fetched parameter',
        hasValue: !!response.Parameter?.Value,
        type: response.Parameter?.Type
      });
    } catch (error) {
      if (error instanceof SSMServiceException) {
        console.error('AWS SSM error:', {
          message: error.message,
          code: error.name,
          requestId: error.$metadata?.requestId
        });
        
        return NextResponse.json({
          success: false,
          error: `${error.name}: ${error.message}`
        }, { status: 500 });
      }
      
      return NextResponse.json({
        success: false,
        error: 'An unexpected error occurred'
      }, { status: 500 });
    }
  }
  