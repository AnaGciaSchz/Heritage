import '../styles/sass/global.scss'
import Header from 'components/Header'
import Box from "components/Box/Box.js"

function MyApp({ Component, pageProps }) {

  return(
  <>
  <Header />
  <Box>
  <Component {...pageProps} />
  </Box>
  </>
  )
}

export default MyApp
