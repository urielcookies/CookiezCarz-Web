import { FC, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';

import { useFormik } from 'formik';
import { CarInformation } from '../interfaces';

import { updateCarInfo } from '../../../endpoints';

const InformationForm: FC<InformationTableProps> = (props) => {
  const {
    carInformation: {
      Brand,
      Cost,
      CleanTitle,
      Id,
      Model,
      Notes,
      Year,
    },
    refetchCarData,
    setEditModeOff,
  } = props;

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      Brand,
      Cost,
      CleanTitle,
      Id,
      Model,
      Notes,
      Year,
    },
    onSubmit: async (carInfo) => {
      setSubmitLoading(true);
      await updateCarInfo(carInfo);
      setSubmitLoading(false);
      setEditModeOff();
      refetchCarData();
    },
  });

  const handleSubmit = () => formik.handleSubmit();

  return (
    <>
      <div className="form-actions">
        <Button
          fullWidth
          className="edit-info-btn"
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          {submitLoading
            ? <CircularProgress color="secondary" className="loadingSpinner" size={24} />
            : 'Save'}
        </Button>

        <Button
          fullWidth
          className="edit-info-btn"
          variant="outlined"
          onClick={setEditModeOff}
        >
          Cancel
        </Button>
      </div>

      <div className="divider" />

      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Year"
            size="small"
            type="number"
            name="Year"
            onChange={formik.handleChange}
            value={formik.values.Year}
          />
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Model"
            size="small"
            type="text"
            name="Model"
            onChange={formik.handleChange}
            value={formik.values.Model}
          />
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Brand"
            size="small"
            type="text"
            name="Brand"
            onChange={formik.handleChange}
            value={formik.values.Brand}
          />
        </div>

        <div className="form-row sec">
          <TextField
            className="form-row-chl"
            variant="outlined"
            label="Cost"
            size="small"
            type="number"
            name="Cost"
            onChange={formik.handleChange}
            value={formik.values.Cost}
          />
          <FormControlLabel
            value="top"
            control={(
              <Switch
                name="CleanTitle"
                onChange={formik.handleChange}
                checked={formik.values.CleanTitle}
                color="primary"
              />
            )}
            label="Clean Title"
          />
        </div>

        <div className="form-row sec notes">
          <div>Notes</div>
          <TextareaAutosize
            minRows={6}
            name="Notes"
            onChange={formik.handleChange}
            value={formik.values.Notes}
          />
        </div>
      </form>
    </>
  );
};

interface InformationTableProps {
  carInformation: CarInformation;
  refetchCarData: Function;
  setEditModeOff: () => void;
}

export default InformationForm;
