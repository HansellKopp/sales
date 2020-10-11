import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'end',
    '& .quantity': {
      fontSize: 24
    }
  },
}))