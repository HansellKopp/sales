import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    '& .column': {
      display: 'flex',
      justifyContent: 'flex-end',
      width: 120,
      '& div': {
        textAlign: 'center',
        padding: 5
      },
    },
    '& .icon-column': {
      width: 60,
      cursor: 'pointer',
      '& div': {
        display: 'block',
        textAlign: 'center'
      }
    }
  },
  button: {
    margin: '10px 10px 10px 0'
  }
}))