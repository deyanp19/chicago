import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import requestMethods from '../../../utils/requestMethods';
import { Snackbar, Alert } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';



const columns = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'level', label: 'Level', minWidth: 80 },
  { id: 'timestamp', label: 'Timestamp', minWidth: 100,
    valueFormatter: (params) => {
      if (!params.value) return '';
      return new Date(params.value).toLocaleDateString('en-CA');
    }
   },

  {
    id: 'message',
    label: 'Message',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, level, timestamp, message) {
  return { id, level, timestamp, message };
}

 


export default function LogTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({ open: false, message: '', severity: 'info' });
  
  
  const rows = logs;

  const handleCloseSnackbar = () => {
          setOpenSnackbar(false);
      };

  useEffect(()=> {
    const getLogs = async () => {
        const data={};
        setLoading(true);
        const response = await requestMethods.postLog(data);
        if (response.ok) {
            const logData = await response.json();
            setLogs(logData);
        } else {
            // throw new Error(`Getting logs failed: ${response.status} - ${await response.text()}`);
            setSnackbarMessage(` ${await response.text()}. Log in again!`);
            setOpenSnackbar(true);
        }

      
    }
    getLogs();

},[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    return (
 <Paper sx={{ width: '100%', overflow: 'hidden' }}>
         {/* Snackbar for displaying messages */}
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            

                  <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}
                  variant='outlined' color="error">
                    <AlertTitle>Warning</AlertTitle>
                      {snackbarMessage} 
                  </Alert>
              
              </Snackbar>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    );
}