import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { downloadCSV } from '../utils/data';

export const DataTable = ({ data }: any) => {
  const str = data.length === 1 ? 'observation found' : 'observations found';
  return (
    <>
      <p>
        <b>{data.length}</b> {str}.{' '}
        <Button variant='outlined' onClick={() => downloadCSV(data)}>
          Download CSV
        </Button>
      </p>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>iNat Number</b>
              </TableCell>
              <TableCell>
                <b>Observed On</b>
              </TableCell>
              <TableCell>
                <b>User Name</b>
              </TableCell>
              <TableCell>
                <b>Voucher Number</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow key={row.name}>
                <TableCell>
                  <a
                    href={`https://www.inaturalist.org/observations/${row.id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {row.id}
                  </a>
                </TableCell>
                <TableCell>{row.observedOn}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.voucherNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
