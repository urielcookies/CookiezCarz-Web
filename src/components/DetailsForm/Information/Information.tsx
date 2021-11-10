import { FC, useState } from 'react';

import { Button } from '@material-ui/core';

import DeleteModal from './DeleteModal';
import InformationTable from './InformationTable';
import InformationForm from './InformationForm';
import InformationStyle from './InformationStyle';
import PermissionsModal from './PermissionsModal/PermissionsModal';

import { CarInformation } from '../interfaces';

const Information: FC<InformationProps> = (props) => {
  const {
    information: { data, refetch },
    userHasWritePermissions,
    vehicleOwner,
  } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false);
  const [permissionsModalActive, setPermissionsModalActive] = useState<boolean>(false);

  const setEditModeOff = () => setEditMode(false);
  const setEditModeOn = () => setEditMode(true);
  return (
    <InformationStyle>
      {!editMode && userHasWritePermissions && (
        <>
          <div className="divider" />
          <Button
            fullWidth
            className="edit-info-btn"
            variant="outlined"
            color="primary"
            onClick={setEditModeOn}
          >
            Edit Information
          </Button>
        </>
      )}

      {!editMode && vehicleOwner && (
        <>
          <div className="divider" />
          <div className="secondary-actions">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDeleteModalActive(true)}
            >
              Delete Car
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setPermissionsModalActive(true)}
            >
              Permissions
            </Button>
          </div>
        </>
      )}

      <div className="divider" />

      <section className={userHasWritePermissions ? 'info-sec' : 'info-sec-nopermission'}>
        {editMode
          ? (
            <InformationForm
              carInformation={data}
              refetchCarData={refetch}
              setEditModeOff={setEditModeOff}
            />
          )
          : <InformationTable carInformation={data} />}

        {deleteModalActive && (
          <DeleteModal
            carInfoId={data.Id}
            show={deleteModalActive}
            close={() => setDeleteModalActive(false)}
          />
        )}

        {permissionsModalActive && (
          <PermissionsModal
            carInfoId={data.Id}
            show={permissionsModalActive}
            close={() => setPermissionsModalActive(false)}
          />
        )}
      </section>
    </InformationStyle>
  );
};

interface InformationProps {
  information: {
    data: CarInformation;
    refetch: Function
  };
  userHasWritePermissions: boolean;
  vehicleOwner: boolean;
}

export default Information;
