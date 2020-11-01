import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    '& .column': {
      width: 120,
      display: 'flex',
      justifyContent: 'flex-end',
      '& div': {
        textAlign: 'center',
        padding: 5
      },
    },
    '& .icon-column': {
      width: 60,
      '& div': {
        display: 'block',
        textAlign: 'center'
      }
    }
  },
}))