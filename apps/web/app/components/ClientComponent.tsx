'use client';

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg bg-rose-50 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-rose-900 mb-3">
        Client Component
      </h2>
      <div className="space-y-4">
        <p className="text-rose-800">
          This component is explicitly set to render on the client
        </p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-rose-500 text-white px-4 py-2 rounded-md
                     hover:bg-rose-600 transition-colors
                     active:bg-rose-700 focus:outline-none
                     focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
}