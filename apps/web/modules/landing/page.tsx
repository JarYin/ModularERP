import { useTranslations } from 'next-intl';
import Footer from './components/layout/Footer';
import ModuleExample from './components/ModuleExample';

export default function LandingPage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">{t('title.title-1')}</h1>
          <h1 className="text-6xl font-bold">
            {t('title.title-2')}{' '}
            <span className="font-bold text-blue-600">
              {t('title.title-3')}
            </span>
          </h1>
          <h1 className="text-6xl font-bold text-blue-600">
            {t('title.title-4')}
          </h1>

          <p className="text-2xl mt-8 font-semibold text-gray-600/75 dark:text-gray-400/75">
            {t('description.desc-1')}
          </p>
          <p className="text-2xl font-semibold text-gray-600/75 dark:text-gray-400/75">
            {t('description.desc-2')}
          </p>

          <div className="flex gap-2 justify-center">
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer">
              {t('button.title-1')}
            </button>
            <button className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-50 transition duration-200 cursor-pointer">
              {t('button.title-2')}
            </button>
          </div>
        </div>
      </main>
      <div>
        <ModuleExample />
        <div className="bg-blue-600 text-center mt-5">
          <h1 className="font-bold text-white text-5xl pt-20">
            {t('description.desc-4')}
          </h1>
          <p className="font-bold text-white text-xl mt-5">
            {t('description.desc-5')}
          </p>
          <div className="flex justify-center gap-2">
            <button className="mt-4 px-6 py-3 mb-20 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200 cursor-pointer">
              {t("button.title-2")}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
