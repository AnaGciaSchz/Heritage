import '../styles/sass/global.scss'
import Header from 'components/Header/Header.js'
import Box from "components/Box/Box.js"
import Footer from "components/Footer/Footer.js"

function MyApp({ Component, pageProps }) {

  return(
  <>
  <Header />
  <Box>
  <Component {...pageProps} />
  </Box>
  <Footer/>
  </>
  )
}

export default MyApp
