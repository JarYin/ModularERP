import { useTranslations } from 'next-intl';

export default function SignIn() {
  const t = useTranslations('SignIn');
  return (
    <div className="bg-gray-50 h-screen w-full">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">ModularERP</h1>
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-center text-3xl font-bold">{t('title')}</h1>
          <p className="text-center font-semibold text-gray-500">
            {t('subtitle.sub-1')}
          </p>
          <button className="w-full border text-black p-2 rounded font-semibold">
            {t('button.button-1')}
          </button>
            <p className="text-center font-semibold w-full">
              {t('subtitle.sub-2')}
            </p>
          <form>
            <label>{t('InputForm.email')}</label>
            <input
              type="email"
              placeholder={t('InputForm.placeholder.email')}
              className="border p-2 mb-4 w-full rounded"
            />
            <label>{t('InputForm.password')}</label>
            <input
              type="password"
              placeholder={t('InputForm.placeholder.password')}
              className="border p-2 mb-4 w-full rounded"
            />
            <div className="flex items-center justify-between mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">{t('InputForm.rememberMe')}</label>
              </div>
              <div>
                <a href="#" className="text-blue-500">
                  {t('InputForm.forgotPassword')}
                </a>
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">
              {t('button.button-2')}
            </button>

            <p className="text-center">
              {t('subtitle.sub-3')}{' '}
              <a href="#" className="text-blue-500">
                {t('subtitle.sub-4')}
              </a>
            </p>
          </form>
          {/* Sign-in form goes here */}
        </div>
      </div>
    </div>
  );
}
