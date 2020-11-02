import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
  return ({
    header: {
      margin: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#f1f1f1',
      '& .bold': {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'right'
      }
    },
    fonts: {
      bold: {
        fontSize: 12,
        fontWeight: 600
      }
    },
    table: {
      width: 'calc(100% - 30px)',
      textAlign: 'left',
      margin: theme.spacing(2),
      borderCollapse: 'collapse',
      fontFamily: 'Arial, Helvetica, sans-serif',
      border: '1px solid #1C6EA4',
      backgroundColor: '#EEEEEE',
      
      '& tfoot': {
        '& td': {
          //color: 'white',
          fontSize: '1.2em',
         // backgroundColor: theme.palette.primary.main,
        }
      }
    },
  })
});

/*#
table.invoice {
 ;
 
 
  
  
  
}
table.invoice td, table.invoice th {
  border: 1px solid #AAAAAA;
  padding: 5px 2px;
}
table.invoice tbody td {
  font-size: 14px;
}
table.invoice thead {
  background: #000000;
  background: -moz-linear-gradient(top, #404040 0%, #191919 66%, #000000 100%);
  background: -webkit-linear-gradient(top, #404040 0%, #191919 66%, #000000 100%);
  background: linear-gradient(to bottom, #404040 0%, #191919 66%, #000000 100%);
  border-bottom: 2px solid #444444;
}
table.invoice thead th {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: left;
  border-left: 2px solid #D0E4F5;
}
table.invoice thead th:first-child {
  border-left: none;
}

table.invoice tfoot {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  background: #96A5B1;
  background: -moz-linear-gradient(top, #b0bbc4 0%, #a0aeb8 66%, #96A5B1 100%);
  background: -webkit-linear-gradient(top, #b0bbc4 0%, #a0aeb8 66%, #96A5B1 100%);
  background: linear-gradient(to bottom, #b0bbc4 0%, #a0aeb8 66%, #96A5B1 100%);
}
table.invoice tfoot td {
  font-size: 16px;
}*/