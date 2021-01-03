import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingTop: theme.spacing(1),
  },
  formControl: {
      margin: theme.spacing(0),
      marginLeft: 0,
    },
  }));
  