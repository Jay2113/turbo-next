import { 
  SecretsManagerClient, 
  GetSecretValueCommand,
  SecretsManagerServiceException 
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

type SecretResult = {
  success: boolean;
  message?: string;
  hasSecret?: boolean;
  error?: string;
};

async function getSecret(): Promise<SecretResult> {
  try {
    console.log('AWS Region:', process.env.AWS_REGION);
    console.log('Environment:', process.env.NODE_ENV);
    
    const command = new GetSecretValueCommand({
      SecretId: "prod/app/db",
    });

    console.log('Attempting to fetch secret...');
    const response = await client.send(command);
    console.log('Secret fetched successfully');

    return {
      success: true,
      message: 'Successfully fetched secret',
      hasSecret: !!response.SecretString
    };
  } catch (error) {
    if (error instanceof SecretsManagerServiceException) {
      console.error('AWS Secrets Manager error:', {
        message: error.message,
        code: error.name,
        requestId: error.$metadata?.requestId,
        stack: error.stack
      });
      
      return {
        success: false,
        error: `${error.name}: ${error.message}`
      };
    }
    
    console.error('Unexpected error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred'
    };
  }
}

export default async function SecretTest() {
  const result = await getSecret();

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Secret Manager Test</h2>
      
      <div className={`p-4 rounded-lg ${
        result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}