import '../styles/sass/global.scss'
import "../components/Alert/alert.css"
import Header from 'components/Header/Header.js'
import Box from "components/Box/Box.js"
import Footer from "components/Footer/Footer.js"
import Internacionalizator from "../components/Internacionalizator/Internacionalizator"
import Logout from '../components/Logout/Logout'
import { Alert } from "components/Alert/Alert";
import cookieCutter from "cookie-cutter"

import NextNProgress from 'nextjs-progressbar';

import { IntlProvider } from "react-intl"
import * as locales from "../content/locale"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";

import { Provider } from 'react-redux';
import { store } from '../services/redux/store.js';

export default function MyApp({ Component, pageProps }) {

  const router = useRouter()

  const [authorized, setAuthorized] = useState(false);

  const { locale, defaultLocale, pathname } = router
  const localeCopy = locales[locale]
  const messages = localeCopy[pathname]

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck)
    return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
    }
}, []);

function authCheck(url) {
    const privatePaths = ['/EditorHistoria','/ast/EditorHistoria','/en/EditorHistoria','/es/EditorHistoria','/api/admin/register','/api/card/tempUploadImage'
    ,'/api/card/uploadImage','/api/card/uploadInfo','/api/create','/heritage_admin_register','/ast/heritage_admin_register'
    ,'/en/heritage_admin_register','/es/heritage_admin_register','/api/card/delete', '/api/card/update', '/api/handlers', '/api/history/saveInfo'];
    const path = url.split('?')[0];
    if (cookieCutter.get('userName')==undefined && privatePaths.includes(path)) {
        setAuthorized(false);
        router.push({
            pathname: "/",
            locale: router.locale
        });
    } else {
        setAuthorized(true);
    }
}

  return (
    <Provider store={store}>
    <IntlProvider
    locale={locale}
    defaultLocale={defaultLocale}
    messages={messages}
    onError={(error) => error}
    >
      <Header />
      <Box>
      <Internacionalizator/>
      <Logout/>
      <Alert />
      <NextNProgress />
        <Component {...pageProps} />
      </Box>
      <Footer />
    </IntlProvider>
    </Provider>
  )
}
