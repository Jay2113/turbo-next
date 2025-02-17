'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function S3Component() {
  const [imageError, setImageError] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="absolute inset-0 top-[88px] flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl mx-4">
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              className="px-8 py-4 bg-[rgb(117,81,194)] text-white text-lg rounded-xl 
                       hover:bg-[rgb(107,71,184)] transition-colors"
            >
              <span className="flex items-center gap-2">
                Access Private S3 Bucket
                <span className="text-xl">⚡</span>
              </span>
            </button>
          ) : (
            <div className="space-y-8 w-full">              
              {!imageError && (
                <div className="relative h-64 w-full">
                  <Image 
                    src="/api/image"
                    alt="Amplify Logo"
                    fill
                    unoptimized
                    priority
                    onError={() => setImageError(true)}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  This content is securely served from S3 using an IAM Compute Role.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}