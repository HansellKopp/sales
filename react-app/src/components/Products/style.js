import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    padding: 0,
    '& .column': {
      display: 'flex',
      justifyContent: 'flex-end',
      width: 120,
      '& div': {
        textAlign: 'right',
        paddingRight: 5
      },
      '& .MuiListItemIcon-root': {
        padding:0,
        minWidth: 0
      },
    }
  },
}))