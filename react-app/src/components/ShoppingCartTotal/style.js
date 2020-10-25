import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    justifyContent: 'flex-end',
    '& .total-row': {
      display: 'flex',
      textAlign: 'right',
      '& .amount': {
        width: 100,
        '& div': {
          padding: 5
        },
        '& .MuiListItemIcon-root': {
          minWidth: 0
        },
      }
    },
  },
}))