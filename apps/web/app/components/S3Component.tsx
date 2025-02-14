'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function WelcomeMessage() {
  const [imageError, setImageError] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0)]">
      {/* <div className="w-full max-w-2xl bg-[rgb(13,17,23)] rounded-2xl shadow-2xl mx-4"> */}
      <div className="w-full max-w-2xl bg-[rgb(0,0,0)] rounded-2xl shadow-2xl mx-4">
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              className="px-8 py-4 bg-[rgb(117,81,194)] text-white text-lg 
                       rounded-xl hover:bg-[rgb(107,71,184)] transition-colors"
            >
              <span className="flex items-center gap-2">
                Access Private S3
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
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    onError={() => setImageError(true)}
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