import React, {useState} from 'react';

import {isEqual} from 'lodash';
import {Button, Form} from 'semantic-ui-react'

import {giveUserCarPermissions} from '../../../../endpoints';

const USER_HAS_ACCESS = 'USER_HAS_ACCESS';
const USER_NO_EXIST = 'USER_NO_EXIST';

const GivePermissions = ({carInfoId, close, getUsers}) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const givePermissionHandler = () => {
    setIsLoading(true);
    errorMessage && setErrorMessage(null);
    const carAccess = {
      CarInformationId: carInfoId,
      Write: edit,
      Username: username
    };
    giveUserCarPermissions(carAccess).then((response) => {
      if (response && response.data === USER_HAS_ACCESS)
        setErrorMessage('This user has permissions already');
      else if (response && response.data === USER_NO_EXIST)
        setErrorMessage('This user does not exist');
      else
        getUsers()

      setIsLoading(false)
      setUsername('');
    })
  };

  return (
    <Form as="div">
      <Form.Group widths='equal'>
            
        <Form.Input
          name="username"
          label='Give Permission'
          placeholder="username"
          onChange={({target: {value}}) => setUsername(value)}
          value={username} />

        <Form.Checkbox
          toggle
          label={edit ? `${username} can edit data` : `${username} can only view data`}
          id="edit"
          name="edit"
          checked={edit}
          onChange={({target: {checked}}) => setEdit(checked)} />
                  
      </Form.Group>

        {!isEqual(errorMessage, null) && (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
            <small style={{color: 'red'}}>{errorMessage}</small>
          </div>
        )}
            
        <div style={{display: 'flex'}}>
          <Button fluid basic loading={isLoading} disabled={isEqual(username, '')} color="teal" content="Give Permission" type="button" onClick={givePermissionHandler} />
          <Button fluid basic content="Cancel" onClick={close} />
        </div>

    </Form>
  )
};

export default GivePermissions;
