import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MuiAlert from "@material-ui/lab/Alert"
import Snackbar from '@material-ui/core/Snackbar'

import { useStyles } from './style'

export default () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { showSnackbar, alert} = useSelector(state => state.state)
	const handleClose  = () => dispatch({ type: 'state/toogleShowSnackBar' })
    return (
        <Snackbar
            className={classes.root}
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={alert.severity}
            >
                {alert.message}
            </MuiAlert>
        </Snackbar>
    )
}
