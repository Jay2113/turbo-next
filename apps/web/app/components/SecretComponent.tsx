'use client';

import { useEffect, useState } from 'react';

type SecretResult = {
  success: boolean;
  message?: string;
  hasSecret?: boolean;
  error?: string;
};

export default function SecretManager() {
  const [result, setResult] = useState<SecretResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/secret')
      .then(res => res.json())
      .then(data => setResult(data))
      .catch(error => setResult({
        success: false,
        error: error.message
      }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Secret Manager</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Secret Manager</h2>
      
      <div className={`p-4 rounded-lg ${
        result?.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}