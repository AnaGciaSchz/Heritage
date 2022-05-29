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
import { useEffect } from "react";

import { Provider } from 'react-redux';
import { store } from '../services/redux/store.js';

export default function MyApp({ Component, pageProps }) {

  const router = useRouter()

  const { locale, defaultLocale, pathname } = router
  const localeCopy = locales[locale]
  const messages = localeCopy[pathname]

  useEffect(() => {
    authCheck(router.asPath);
  }, []);

  function authCheck(url) {
    const privatePathsNormalUser = ['/EditorHistoria', '/ast/EditorHistoria', '/en/EditorHistoria', '/es/EditorHistoria', '/heritage_admin_register', '/ast/heritage_admin_register'
      , '/en/heritage_admin_register', '/es/heritage_admin_register'];
    const notAllowedPathAdmin = ['/heritage_admin_login', '/ast/heritage_admin_login'
      , '/en/heritage_admin_login', '/es/heritage_admin_login']
    const publicUrls = ['/','/es','/en','/ast','/HistoriaEII','/es/HistoriaEII','/en/HistoriaEII', '/ast/HistoriaEII','/ZonaEgresados', '/es/ZonaEgresados',
    '/en/ZonaEgresados','/ast/ZonaEgresados','/ZonaProfesorado','/es/ZonaProfesorado','/en/ZonaProfesorado','/ast/ZonaProfesorado','/ZonaDelegacion',
    '/es/ZonaDelegacion','/en/ZonaDelegacion','/ast/ZonaDelegacion','/about','/es/about','/en/about','/ast/about','/Contacto','/es/Contacto',
    '/en/Contacto','/ast/Contacto','/heritage_admin_login','/es/heritage_admin_login','/en/heritage_admin_login','/ast/heritage_admin_login',
    '/500','/es/500','/en/500','/ast/500','/404','/es/404','/en/404','/ast/404']
    const path = url.split('?')[0];
    if(!privatePathsNormalUser.includes(path) && !notAllowedPathAdmin.includes(path) && !publicUrls.includes(path)){
      router.push({
        pathname: "/404",
        locale: router.locale
      });
    }
    else if (cookieCutter.get('userName') == undefined && privatePathsNormalUser.includes(path)) {
      router.push({
        pathname: "/",
        locale: router.locale
      });
    } else if (cookieCutter.get('userName') != undefined && notAllowedPathAdmin.includes(path)) {
      router.push({
        pathname: "/",
        locale: router.locale
      });
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
          <Internacionalizator />
          <Logout />
          <Alert />
          <NextNProgress />
          <Component {...pageProps} />
        </Box>
        <Footer />
      </IntlProvider>
    </Provider>
  )
}
