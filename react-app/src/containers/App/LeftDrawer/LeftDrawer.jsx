import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import MainListItems from './ListItems';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useStyles from './styles'

const LeftDrawer = () => {
    const classes = useStyles();
    const dispatch = useDispatch()      
    const { openDrawer } = useSelector(state => state.state)
    const toogleOpenDrawer  = () => dispatch({ type: 'state/toogleOpenDrawer' })
    return (
        <Drawer
            variant="temporary"
            anchor="left"
            classes={{
                paper: classnames(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
            }}
            open={openDrawer}
            >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={toogleOpenDrawer}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List><MainListItems /></List>
        </Drawer>
    )
}

export default LeftDrawer