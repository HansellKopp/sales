import { makeStyles } from '@material-ui/core/styles';
  
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: 'auto',
      '& .MuiFormControl-root': {
        width: '100%'
      },
      '& .MuiCardActions-root' : {
        justifyContent: 'flex-end'  
      }
    },
  });

  
export default useStyles