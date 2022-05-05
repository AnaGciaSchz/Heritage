import '../styles/sass/global.scss'
import "../components/Alert/alert.css"
import Header from 'components/Header/Header.js'
import Box from "components/Box/Box.js"
import Footer from "components/Footer/Footer.js"
import Internacionalizator from "../components/Internacionalizator/Internacionalizator"
import { Alert } from "components/Alert/Alert";

import { IntlProvider } from "react-intl"
import * as locales from "../content/locale"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";

import { Provider } from 'react-redux';
import { store } from '../services/redux/store.js';

import { userService } from '../services/userService'

export default function MyApp({ Component, pageProps }) {

  const router = useRouter()

  const [authorized, setAuthorized] = useState(false);

  const { locale, defaultLocale, pathname } = router
  const localeCopy = locales[locale]
  const messages = localeCopy[pathname]

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
    }
}, []);

function authCheck(url) {
    const privatePaths = ['/ZonaAdmin','/ast/ZonaAdmin','/en/ZonaAdmin','/es/ZonaAdmin',
    '/heritage_admin_register','/ast/heritage_admin_register','/en/heritage_admin_register','/es/heritage_admin_register'];
    const path = url.split('?')[0];
    if (!userService.userValue && privatePaths.includes(path)) {
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
      <Alert />
        <Component {...pageProps} />
      </Box>
      <Footer />
    </IntlProvider>
    </Provider>
  )
}
