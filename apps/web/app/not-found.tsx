export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 animate-pulse">
            404
          </h1>
        </div>
        {/* Message */}
        <h2 className="text-3xl font-bold text-blue-600 bg-clip-text mb-4">
          Oops! Page Not Found
        </h2>
        </div>
    </div>
  );
}