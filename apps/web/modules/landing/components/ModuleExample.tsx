import { Building2, Package, Users, Calculator, ShoppingCart, ChartColumn } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ModuleExample() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">
          {t("title.title-5")}
        </h1>
        <p className="text-xl font-semibold text-gray-600/75 dark:text-gray-600/75">
          {t("description.desc-3")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
          <div className='bg-sky-50 w-fit p-1 rounded-md'>
            <Building2 className="h-8 w-8  text-blue-600" />
          </div>
          <h1 className="text-lg font-semibold mb-2">CRM & Sales</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.CRM.desc-1")}
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.CRM.desc-2")}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-50 w-fit p-1 rounded-md'>
                <Package className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Inventory Management</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.InventoryManagement.desc-1")}
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.InventoryManagement.desc-2")}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
          <div className='bg-sky-50 w-fit p-1 rounded-md'>
            <Users className="h-8 w-8  text-blue-600" />
          </div>
          <h1 className="text-lg font-semibold mb-2">HR & Payroll</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.HR&Payroll.desc-1")}
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.HR&Payroll.desc-2")}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-50 w-fit p-1 rounded-md'>
                <Calculator className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Accounting & Finance</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.Accounting&Finance.desc-1")}
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.Accounting&Finance.desc-2")}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-50 w-fit p-1 rounded-md'>
                <ShoppingCart className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Point of Sale</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.PointOfSale.desc-1")}
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.PointOfSale.desc-2")}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs hover:scale-110 transition-all">
            <div className='bg-sky-50 w-fit p-1 rounded-md'>
                <ChartColumn className="h-8 w-8  text-blue-600" />
            </div>
          <h1 className="text-lg font-semibold mb-2">Analytics & Reporting</h1>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.Analytics&Reporting.desc-1")}
          </p>
          <p className="text-gray-600/75 dark:text-gray-600/75">
            {t("description.Analytics&Reporting.desc-2")}
          </p>
        </div>
      </div>
    </div>
  );
}
