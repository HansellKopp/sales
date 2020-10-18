import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    '& p': {
      fontSize: '1.25em',
      textAlign: 'end',
      paddingRight: '1em'
    },
    '& svg': {
      minWidth: 'auto'
    }
  },
}))