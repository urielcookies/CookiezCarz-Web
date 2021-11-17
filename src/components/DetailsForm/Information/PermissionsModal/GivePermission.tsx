import { FC, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';

import { useFormik } from 'formik';

import { isEqual } from 'lodash';
import { giveUserCarPermissions } from '../../../../endpoints';

const GivePermission: FC<GivePermissionProps> = (props) => {
  const {
    carInfoId,
    close,
    getUsers,
    viewEditTab,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      CarInformationId: carInfoId,
      Username: '',
      Write: false,
    },
    onSubmit: async (carAccess) => {
      setSubmitLoading(true);
      const response = await giveUserCarPermissions(carAccess);

      setSubmitLoading(false);
      formik.resetForm();

      if (response.data === 'USER_HAS_ACCESS') setErrorMessage('This user has permissions already');
      else if (response.data === 'USER_NO_EXIST') setErrorMessage('This user does not exist');
      else {
        getUsers();
        setErrorMessage('');
        viewEditTab();
      }
    },
  });

  const handleSubmit = () => formik.handleSubmit();

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          size="small"
          type="text"
          name="Username"
          onChange={formik.handleChange}
          value={formik.values.Username}
        />

        <FormControlLabel
          control={(
            <Switch
              checked={formik.values.Write}
              onChange={formik.handleChange}
              name="Write"
              color="primary"
            />
          )}
          label={formik.values.Write ? 'can edit data' : 'can only view data'}
        />
      </div>

      {!isEqual(errorMessage, '') && (
        <div className="error-message">
          <small>{errorMessage}</small>
        </div>
      )}

      <div className="give-permissions-actions">
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          {submitLoading
            ? <CircularProgress color="secondary" size={24} />
            : 'Save'}
        </Button>
        <Button variant="outlined" onClick={close}>Cancel</Button>
      </div>
    </form>
  );
};

interface GivePermissionProps {
  carInfoId: number;
  close: () => void;
  getUsers: () => void;
  viewEditTab: Function
}

export default GivePermission;
