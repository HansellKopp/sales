import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding:0,
    ' & .holder' :{
      display: 'flex',
      minWidth: 80,
      '& .quantity': {
        paddingLeft: 3,
        paddingRight: 3
      }
    },
  },
}))