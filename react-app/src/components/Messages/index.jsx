import { useSelector, useDispatch } from 'react-redux'

import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

// TODO testing
const Messages = () => {
    const dispatch = useDispatch()   
    const messages = useSelector(state => state.state.messages)
    const messagesOpen = messages.length > 0    
    const close = (e) => dispatch({type: 'state/removeMessage', payload: { id: e.messageId } })
    if(!messagesOpen) return null
    return (
        <Snackbar open={messagesOpen} autoHideDuration={6000} >
            <MuiAlert
                elevation={6}
                onClose={close} 
                variant="filled"
                key={messages[0].id}
                messageId={messages[0].id}
                severity={messages[0].severity}
            >{messages[0].message}</MuiAlert>
        </Snackbar>
    )

}

export default Messages