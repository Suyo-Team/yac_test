/* import external modules */
import { Link, Typography } from '@material-ui/core'

/* import internal modules */
import useStyles from './styles'

const Footer = () => {
  const classes = useStyles()
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.container}
    >
      {'Copyright © '}
      <Link color="inherit">Suyo Chat Challenge</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer
