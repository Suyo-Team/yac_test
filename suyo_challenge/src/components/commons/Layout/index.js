/* import external modules */
import { Container } from '@material-ui/core'

/* import internal modules */
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <Container component="main" maxWidth="xs">
      {children}
      <Footer />
    </Container>
  )
}

export default Layout
