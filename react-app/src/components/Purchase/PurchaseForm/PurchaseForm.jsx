import { Link } from 'react-router-dom'
import { Breadcrumbs, Typography }  from '@material-ui/core';
import ProviderForm from './Provider/ProviderForm'
import PurchaseTable from './PurchaseTable/PurchaseTable'
import PurchaseActions from './PurchaseActions/PurchaseActions'

const PurchaseForm = () => 
    <div>
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/">
                Inicio
            </Link>
            <Link color="inherit" to="/purchases/">
                Compras
            </Link>
            <Typography color="textPrimary">Compra nueva</Typography>
        </Breadcrumbs>
        <ProviderForm />
        <PurchaseTable />
        <PurchaseActions />
    </div>

export default PurchaseForm