import '../styles/sass/global.scss'

import Header from 'components/Header/Header.js'
import Box from "components/Box/Box.js"
import Footer from "components/Footer/Footer.js"

import { IntlProvider } from "react-intl"
import * as locales from "../content/locale"
import { useRouter } from "next/router"

export default function MyApp({ Component, pageProps }) {
  
  const router = useRouter()
  const { locale, defaultLocale, pathname } = router
  const localeCopy = locales[locale]
  const messages = localeCopy[pathname]
  return (
    <IntlProvider
    locale={locale}
    defaultLocale={defaultLocale}
    messages={messages}
    >
      <Header />
      <Box>
        <Component {...pageProps} />
      </Box>
      <Footer />
    </IntlProvider>
  )
}
