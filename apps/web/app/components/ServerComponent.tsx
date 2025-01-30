export default async function ServerComponent() {
    return (
      <div className="rounded-lg bg-blue-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">Server Component</h2>
        <div className="text-blue-800 space-y-2">
          <p>This component is rendered on the server by default</p>
          <p className="font-mono text-sm">
            Rendered at: {new Date().toISOString()}
          </p>
        </div>
      </div>
    );
  }