import { 
    SecretsManagerClient, 
    GetSecretValueCommand,
    SecretsManagerServiceException 
  } from "@aws-sdk/client-secrets-manager";
  import { NextResponse } from 'next/server';
  
  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION || 'us-east-1'
  });
  
  export async function GET() {
    try {
      const command = new GetSecretValueCommand({
        SecretId: "prod/app/db",
      });
  
      const response = await client.send(command);
      
      return NextResponse.json({
        success: true,
        message: 'Successfully fetched secret',
        hasSecret: !!response.SecretString
      });
    } catch (error) {
      if (error instanceof SecretsManagerServiceException) {
        console.error('AWS Secrets Manager error:', {
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