import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    '& .price': {
      display: 'flex',
      width: 120,
      '& div': {
        textAlign: 'center',
        padding: 5
      },
      '& .MuiListItemIcon-root': {
        minWidth: 0
      },
    }
  },
}))