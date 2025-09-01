import Footer from './components/layout/Footer';
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
        <div className='bg-blue-600 text-center mt-5'>
          <h1 className='font-bold text-white text-5xl pt-20'>Ready to Transform Your Business?</h1>
          <p className='font-bold text-white text-xl mt-5'>Join thousands of businesses already using ModularERP to streamline</p>
          <p className='font-bold text-white text-xl'>their operations.</p>
          <div className='flex justify-center gap-2'>
            <button className='mt-4 px-6 py-3 mb-20 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200 cursor-pointer'>Start Free Trial</button>
            <button className='mt-4 px-6 py-3 mb-20 border border-white text-white font-semibold rounded-lg shadow-md hover:bg-gray-50 hover:text-black transition duration-200 cursor-pointer'>Schedule Demo</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
