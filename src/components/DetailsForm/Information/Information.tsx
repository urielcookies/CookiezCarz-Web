import { FC, useState } from 'react';

import { Button } from '@material-ui/core';

import InformationTable from './InformationTable';
import InformationForm from './InformationForm';
import InformationStyle from './InformationStyle';

const Information: FC<InformationProps> = ({ userHasWritePermissions }) => {
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
            Edit Information
          </Button>
        </>
      )}

      <div className="divider" />

      <section className={editMode ? 'info-sec' : 'info-sec-nopermission'}>
        {editMode
          ? <InformationForm />
          : <InformationTable />}
      </section>
    </InformationStyle>
  );
};

interface InformationProps {
  userHasWritePermissions: boolean;
}

export default Information;
