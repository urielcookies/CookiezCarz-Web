import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from 'react';
import { isEqual } from 'lodash';

import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@material-ui/core';

import TabPanel from '../../TabPanel';
import LoadAllUserPermission from './LoadAllUserPermission';
import GivePermissions from './GivePermission';
import PermissionModalStyle from './PermissionModalStyle';

import { fetchUsersWithCarAccess } from '../../../../endpoints';

const PermissionModal: FC<PermissionModalProps> = ({ carInfoId, closeModal }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [usersWithPermissions, setUsersWithPermissions] = useState([]);

  const tabChangeHandler = (event: ChangeEvent<{}>, newValue: number) => setPageIndex(newValue);

  const getUsers = async () => {
    const response = await fetchUsersWithCarAccess(carInfoId);
    setUsersWithPermissions(response.data);
  };

  useEffect(() => {
    getUsers();
  }, [pageIndex]);

  return (
    <Dialog
      open
      onClose={closeModal}
      fullWidth
    >
      <DialogTitle>Permissions</DialogTitle>
      <DialogContent>
        <PermissionModalStyle>
          <AppBar position="static" color="default">
            <Tabs
              value={pageIndex}
              onChange={tabChangeHandler}
              indicatorColor="primary"
              textColor="primary"
              className="tabs-content"
            >
              <Tab label="Give" />
              <Tab label="Edit" />
            </Tabs>
          </AppBar>

          <br />
          <hr />

          {isEqual(pageIndex, 0) && (
            <TabPanel value={pageIndex} index={0}>
              <GivePermissions
                carInfoId={carInfoId}
                close={closeModal}
                getUsers={getUsers}
              />
            </TabPanel>
          )}

          {isEqual(pageIndex, 1) && (
            <TabPanel value={pageIndex} index={1}>
              <LoadAllUserPermission
                carInfoId={carInfoId}
                close={closeModal}
                getUsers={getUsers}
                usersWithPermissions={usersWithPermissions}
              />
            </TabPanel>
          )}
        </PermissionModalStyle>
      </DialogContent>
    </Dialog>
  );
};

interface PermissionModalProps {
  carInfoId: number;
  closeModal: () => void;
}

export default PermissionModal;
