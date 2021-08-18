import { FC } from 'react';
import { Link } from 'react-router-dom';
import { isUndefined, map } from 'lodash';

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

interface Row {
  Id: number;
  Brand: string;
  Model: string;
  Year: string;
  UserAccountId: number;
}

interface ParamTypes {
  userId: string | undefined;
}

interface CarlistTableProps extends ParamTypes {
  rows: Row[] | null;
}

const CarlistTable: FC<CarlistTableProps> = ({ rows, userId }) => {
  const path = ({ Id, UserAccountId }: Row) => {
    const link = isUndefined(userId) ? 'mycarlist' : 'carlist';
    return `/home/${link}/${UserAccountId}/${Id}/info`;
  }

  return (
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
                  <AssignmentOutlined style={{ fontSize: '1.7rem' }} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { CarlistTable };
export type { ParamTypes };
