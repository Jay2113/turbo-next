'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

type WelcomeResult = {
  success: boolean;
  content?: {
    message: string;
    imageUrl?: string;
  };
  html?: string;
  error?: string;
};

export default function WelcomeMessage() {
  const [result, setResult] = useState<WelcomeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    fetch('/api/welcome')
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
      <div className="p-6 border rounded-lg bg-white shadow-sm w-full max-w-xl mx-auto">
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(117,81,194)]"></div>
        </div>
      </div>
    );
  }

  if (!result?.success) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow-sm w-full max-w-xl mx-auto">
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-red-700">
            {result?.error || 'Failed to load content'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm w-full max-w-xl mx-auto">
      <div className="flex flex-col items-center space-y-6">
        {!isRevealed && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsRevealed(true)}
              className="px-6 py-3 bg-[rgb(117,81,194)] text-white text-lg rounded-lg
                       hover:bg-[rgb(107,71,184)] transition-colors duration-200 
                       shadow-sm hover:shadow-md flex items-center space-x-2"
            >
              <span>Test IAM Role</span>
              <span className="text-xl">⚡</span>
            </button>
          </div>
        )}

        <div className={`space-y-6 w-full transition-all duration-500 ease-in-out 
                        ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {result.content?.message && (
            <div className="text-center transition-all duration-500 delay-100">
              <p className="text-2xl text-gray-800 font-medium">
                {result.content.message}
              </p>
            </div>
          )}
          
          {result.content?.imageUrl && !imageError && (
            <div className="flex justify-center transition-all duration-500 delay-200">
              <div className="relative w-full h-64">
                <Image 
                  src={result.content.imageUrl}
                  alt="Welcome"
                  fill
                  className="rounded-lg shadow-lg object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          )}
          
          <div className="text-center transition-all duration-500 delay-300">
            <p className="text-sm text-gray-600">
              This content is securely served from AWS S3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}