import { FC } from 'react';

import { TextField } from '@material-ui/core';

const InformationForm: FC = () => (
  <div>
    <form noValidate autoComplete="off">
      <div id="line-1">
        <TextField className="line-1-chl" variant="outlined" label="Year" size="small" />
        <TextField className="line-1-chl" variant="outlined" label="Model" size="small" />
        <TextField className="line-1-chl" variant="outlined" label="Brand" size="small" />
      </div>
    </form>
  </div>
);

export default InformationForm;
// flex: 0 1 49%;
