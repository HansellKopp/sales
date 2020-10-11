import React from 'react'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default () => 
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://hksoluciones.com/">
          HK soluciones
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  