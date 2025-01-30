import ClientComponent from './components/ClientComponent';
import ServerComponent from './components/ServerComponent';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Next.js Rendering Demo
        </h1>
        
        <div className="space-y-6">
          <ServerComponent />
          <ClientComponent />
        </div>
      </div>
    </div>
  );
}