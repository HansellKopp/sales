import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding:0,
    ' & .holder' :{
      display: 'flex',
      minWidth: 40,
      alignItems: 'center',
      '& .quantity': {
        paddingRight: 5
      }
    },
  },
}))