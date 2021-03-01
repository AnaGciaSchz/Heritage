import '../styles/css/global.css'
import Header from 'components/Header'
import Box from "components/Box"

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
