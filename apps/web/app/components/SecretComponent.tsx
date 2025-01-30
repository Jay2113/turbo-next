import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({});

async function getSecret() {
  try {
    const command = new GetSecretValueCommand({
      SecretId: "prod/app/db",
    });

    const response = await client.send(command);
    return {
      success: true,
      message: 'Successfully fetched secret',
      hasSecret: !!response.SecretString
    };
  } catch (error) {
    console.error('Error fetching secret:', error);
    return {
      success: false,
    };
  }
}

export default async function SecretTest() {
  const result = await getSecret();

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Secret Manager Test</h2>
      
      <div className={`p-4 rounded-lg ${
        result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        {result.success ? (
          <>
            <p className="font-medium">✓ {result.message}</p>
            <p className="mt-2 text-sm">Secret is {result.hasSecret ? 'present' : 'empty'}</p>
          </>
        ) : (
          <>
            <p className="font-medium">✗ Failed to fetch secret</p>
          </>
        )}
      </div>
    </div>
  );
}