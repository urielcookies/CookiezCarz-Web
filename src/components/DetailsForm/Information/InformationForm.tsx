import { FC } from 'react';

import {
  FormControlLabel,
  Switch,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';

import { CarInformation } from '../interfaces';

const InformationForm: FC<InformationTableProps> = ({ carInformation }) => {
  const {
    Brand,
    Cost,
    CleanTitle,
    Model,
    Notes,
    Year,
  } = carInformation;
  return (
    <div>
      <form noValidate autoComplete="off">
        <div className="form-row">
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Year"
            size="small"
            type="number"
            defaultValue={Year}
          />
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Model"
            size="small"
            type="text"
            defaultValue={Model}
          />
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Brand"
            size="small"
            type="text"
            defaultValue={Brand}
          />
        </div>

        <div className="form-row sec">
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Cost"
            size="small"
            type="number"
            defaultValue={Cost}
          />
          <FormControlLabel
            value="top"
            control={<Switch defaultChecked={CleanTitle} color="primary" />}
            label="Clean Title"
          />
        </div>

        <div className="form-row sec notes">
          <div>Notes</div>
          <TextareaAutosize minRows={6} defaultValue={Notes} />
        </div>
      </form>
    </div>
  );
};

interface InformationTableProps {
  carInformation: CarInformation;
}

export default InformationForm;
