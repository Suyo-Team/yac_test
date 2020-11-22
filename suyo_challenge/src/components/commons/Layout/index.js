/* import external modules */
import { Fragment } from 'react'

/* import internal modules */
import Footer from '../Footer'
import ButtonAppBar from '../Header'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <ButtonAppBar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default Layout
