export default function Footer() {
  return (
    <div className="flex flex-col items-center text-center bg-gray-900 text-white">
      <div className="grid grid-cols-4 gap-8 w-full max-w-6xl mb-6">
        <div>
          <h1 className="font-bold text-2xl py-4">ModularERP</h1>
          <p className="whitespace-nowrap text-gray-600/75 dark:text-gray-400/75">Streamline your business operations with</p>
          <p className="whitespace-nowrap text-gray-600/75 dark:text-gray-400/75">our flexible, modular ERP solution.</p>
        </div>

        <div className="py-5">
          <h1 className="font-bold">Product</h1>
        </div>

        <div className="py-5">
          <h1 className="font-bold">Company</h1>
        </div>

        <div className="py-5">
          <h1 className="font-bold">Support</h1>
        </div>
      </div>

      <hr className="w-full max-w-6xl" />

      <h3 className="py-3 text-gray-600/75 dark:text-gray-400/75">© 2025 ModularERP. All rights reserved.</h3>
    </div>
  );
}
