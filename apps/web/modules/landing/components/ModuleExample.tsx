import { Building2, Package, Users, Calculator, ShoppingCart, ChartColumn } from 'lucide-react';

export default function ModuleExample() {
  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">
          Everything You Need to Run Your Business
        </h1>
        <p className="text-xl font-semibold text-gray-600/75 dark:text-gray-600/75">
          Unlock new efficiencies with our tailored modules designed for your
          unique needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
          <div className='bg-sky-100 w-fit p-1 rounded-md'>
            <Building2 className="h-8 w-8  text-blue-600" />
          </div>
          <h1 className="text-lg font-semibold mb-2">CRM & Sales</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            Manage customer relationships and track sales
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            pipeline with powerful automation tools.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-100 w-fit p-1 rounded-md'>
                <Package className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Inventory Management</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            Real-time inventory tracking with automated
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            reordering and warehouse management.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
          <div className='bg-sky-100 w-fit p-1 rounded-md'>
            <Users className="h-8 w-8  text-blue-600" />
          </div>
          <h1 className="text-lg font-semibold mb-2">HR & Payroll</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            Complete human resources management with
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            payroll, benefits, and performance tracking.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-100 w-fit p-1 rounded-md'>
                <Calculator className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Accounting & Finance</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            Full accounting suite with invoicing, expense
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            tracking, and financial reporting.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-100 w-fit p-1 rounded-md'>
                <ShoppingCart className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Point of Sale</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            Modern POS system with multi-location support
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            and integrated payment processing.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-100 w-fit p-1 rounded-md'>
                <ChartColumn className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Analytics & Reporting</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            Advanced business intelligence with customizable
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            dashboards and real-time insights.
          </p>
        </div>
      </div>
    </div>
  );
}
