import { FC } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { AssignmentOutlined } from '@material-ui/icons';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const CarlistTable: FC<CarlistTableProps> = ({ path, rows }) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Year</TableCell>
          <TableCell align="center">Model</TableCell>
          <TableCell align="center">Brand</TableCell>
          <TableCell align="center">Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(rows, (row: Row) => (
          <TableRow key={row.Id}>
            <TableCell align="center">{row.Year}</TableCell>
            <TableCell align="center">{row.Model}</TableCell>
            <TableCell align="center">{row.Brand}</TableCell>
            <TableCell align="center">
              <Link to={path(row)}>
                <AssignmentOutlined color="primary" style={{ fontSize: '1.7rem' }} />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

interface CarlistTableProps {
  path: Function;
  rows: Row[];
}

interface Row {
  Id: number;
  Brand: string;
  Model: string;
  UserAccountId: number;
  Year: string;
}

export { CarlistTable };
export type { Row };
