import ModuleExample from './components/ModuleExample';

export default function LandingPage() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">Streamline Your Business</h1>
          <h1 className="text-6xl font-bold">
            Operations with Our{' '}
            <span className="font-bold text-blue-600">Modular</span>
          </h1>
          <h1 className="text-6xl font-bold text-blue-600">ERP Solution</h1>

          <p className="text-2xl mt-8 font-semibold text-gray-600/75 dark:text-gray-400/75">
            Flexible, scalable, and built for the future. Choose only the
            modules{' '}
          </p>
          <p className="text-2xl font-semibold text-gray-600/75 dark:text-gray-400/75">
            you need and scale as you grow.
          </p>

          <div className="flex gap-2 justify-center">
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer">
              Explore Our Module Marketplace
            </button>
            <button className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-50 transition duration-200 cursor-pointer">
              Watch Demo
            </button>
          </div>
        </div>
      </main>
      <div>
        <ModuleExample />
      </div>
    </>
  );
}
