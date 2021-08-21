import { FC, useState } from 'react';

import { Button } from '@material-ui/core';

import InformationTable from './InformationTable';
import InformationForm from './InformationForm';
import InformationStyle from './InformationStyle';

import { CarInformation } from '../interfaces';

const Information: FC<InformationProps> = ({ carInformation, userHasWritePermissions }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <InformationStyle>
      {userHasWritePermissions && (
        <>
          <div className="divider" />
          <Button
            fullWidth
            className="edit-info-btn"
            variant="outlined"
            color="primary"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Exit Editing' : 'Edit Information'}
          </Button>
        </>
      )}

      <div className="divider" />

      <section className={userHasWritePermissions ? 'info-sec' : 'info-sec-nopermission'}>
        {editMode
          ? <InformationForm />
          : <InformationTable carInformation={carInformation} />}
      </section>
    </InformationStyle>
  );
};

interface InformationProps {
  userHasWritePermissions: boolean;
  carInformation: CarInformation;
}

export default Information;
