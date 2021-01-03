import { makeStyles, lighten } from '@material-ui/core/styles'

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1), 
    },
    highlight: {
      color: theme.palette.primary.contrastText,
      backgroundColor: lighten(theme.palette.primary.light, 0.1),
    },

    title: {
      flex: '1 1 100%',
    }
}))

export default useToolbarStyles
