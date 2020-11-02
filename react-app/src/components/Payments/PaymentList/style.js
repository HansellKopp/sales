import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
  return ({
    root: {
    },
    table: {
      minWidth: 650,
      '& tfoot': {
        '& td': {
          //color: 'white',
          fontSize: '1.2em',
         // backgroundColor: theme.palette.primary.main,
        }
      }
    },
    button: {
      margin: theme.spacing(1),
    }
  })
});