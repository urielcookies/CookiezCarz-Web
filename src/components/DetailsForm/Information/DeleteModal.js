import React, { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { deleteCarInformation } from '../../../endpoints';

const DeleteModal = ({
  carInfoId, close, show,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const deleteCarInfoHandler = () => {
    setIsLoading(true);
    deleteCarInformation(carInfoId)
      .then((response) => response.text())
      .then(() => navigate('/home/mycarlist'));
  };

  return (
    <Modal
      closeOnDimmerClick={false}
      open={show}
      onClose={close}
      basic
      size="small"
    >
      <Header icon="trash alternate outline" content="Delete Car Information" />

      <Modal.Content>
        Are you sure you want to delete this car information? All information, access, expenses, status, and images will be lost
      </Modal.Content>

      <Modal.Actions>
        <div style={{ display: 'flex' }}>
          <Button fluid inverted loading={isLoading} color="red" content="DELETE" type="button" onClick={deleteCarInfoHandler} />
          <Button fluid inverted content="Cancel" onClick={close} />
        </div>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
