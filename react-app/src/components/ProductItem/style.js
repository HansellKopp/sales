import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    '& .price': {
      display: 'flex',
      width: 100,
      '& div': {
        textAlign: 'center',
        padding: 5
      },
      '& .MuiListItemIcon-root': {
        padding:0,
        minWidth: 0
      },
    }
  },
}))