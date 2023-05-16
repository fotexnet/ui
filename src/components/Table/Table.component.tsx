import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

interface IProps {
  headers: TableHeaderProp[];
}

function Table(props: TableProps): JSX.Element {
  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            {props.headers.map(head => (
              <TableCell align={head.align} sx={{ width: head.size }}>
                {head.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;

type TableHeaderProp = { label: string | JSX.Element; size: number; align?: 'right' | 'left' };

export type TableProps = React.PropsWithChildren<IProps>;

// TODO: set query params for page, limit, searchquery
