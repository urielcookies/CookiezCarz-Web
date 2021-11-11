import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { deleteCarInformation } from '../../../endpoints';

const DeleteModal: FC<DeleteModalProps> = ({ carInfoId, closeModal }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const deleteCarInfoHandler = async () => {
    setIsLoading(true);
    await deleteCarInformation(carInfoId);
    navigate('/home/mycarlist');
  };

  return (
    <Dialog
      open
      onClose={closeModal}
      fullWidth
    >
      <DialogTitle>Delete Car Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          All information, access, expenses, status, and images will be lost
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteCarInfoHandler} color="secondary" variant="outlined">
          {isLoading
            ? <CircularProgress color="secondary" className="loadingSpinner" size={24} />
            : 'Delete'}
        </Button>
        <Button onClick={closeModal} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DeleteModalProps {
  carInfoId: number;
  closeModal: Function;
}

export default DeleteModal;
