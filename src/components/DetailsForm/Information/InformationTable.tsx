import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';

import { CarInformation } from '../interfaces';

const InformationTable: FC<InformationTableProps> = ({ carInformation }) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const setShowNotesHandler = () => setShowNotes(!showNotes);
  return (
    <>
      <TableContainer id="information-table" component={Paper} variant="outlined">
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell className="header-tbl-cell">Year</TableCell>
              <TableCell className="tbl-cell">{carInformation.Year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="header-tbl-cell">Model</TableCell>
              <TableCell className="tbl-cell">{carInformation.Model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="header-tbl-cell">Brand</TableCell>
              <TableCell className="tbl-cell">{carInformation.Brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="header-tbl-cell">Cost</TableCell>
              <TableCell className="tbl-cell">{carInformation.Cost}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="header-tbl-cell">Clean Title</TableCell>
              <TableCell className="tbl-cell">{carInformation.CleanTitle ? 'Yes' : 'No'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="header-tbl-cell">Notes</TableCell>
              <TableCell className="tbl-cell notes">
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={setShowNotesHandler}
                >
                  View Notes
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {showNotes && (
        <Dialog
          open
          onClose={setShowNotesHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {carInformation.Year}
            &nbsp;
            {carInformation.Model}
            &nbsp;
            {carInformation.Brand}
            &nbsp;Notes
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ whiteSpace: 'pre' }}>
              {carInformation.Notes}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={setShowNotesHandler} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

interface InformationTableProps {
  carInformation: CarInformation;
}

export default InformationTable;
