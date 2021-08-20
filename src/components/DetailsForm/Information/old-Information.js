import React, {useState} from 'react';
import numeral from 'numeral';
import {Button, Divider, Form, Header, Icon, Table} from 'semantic-ui-react'
import {useFormik} from 'formik';

import {updateCarInfo} from '../../../endpoints';

import DeleteModal from './DeleteModal';
import PermissionsModal from './PermissionsModal/PermissionsModal';
import InformationStyle from './InformationStyle';

const AddCarForm = (props) => {
  const {
    activeUserId,
    Brand,
    CleanTitle,
    Cost,
    Id,
    Model,
    Notes,
    setIsCarInfoLoading,
    userHasWritePermissions,
    UserAccountId,
    Year
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [permissionsModalActive, setPermissionsModalActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const editModeHandler = () => setEditMode(!editMode);

  const formik = useFormik({
    initialValues: {
      Year: Year || '',
      Brand: Brand || '',
      Model: Model || '',
      Cost: Cost || '',
      CleanTitle: Boolean(CleanTitle),
      Notes: Notes || ''
    },
    onSubmit: values => {
      setSubmitLoading(true);
      updateCarInfo({...values, Id}, setIsCarInfoLoading).then(() => {
        editModeHandler();
        setSubmitLoading(false);
      });
    },
  });

  return (
    <InformationStyle>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='file alternate outline' />
          Car Information
        </Header>
      </Divider>

      {!editMode && userHasWritePermissions && (
        <Button
          fluid
          content='Edit Information'
          color="teal"
          basic
          loading={submitLoading}
          onClick={editModeHandler} />
      )}
        
      {editMode && (
        <div className="actionButtons">
          <Button fluid basic color="teal" content="Save" type="button" onClick={formik.handleSubmit} />
          <Button fluid basic content="Cancel" onClick={editModeHandler} />
        </div>
      )}
      
      <Divider style={{margin: '5px'}} hidden />

      {!editMode && UserAccountId === activeUserId && (
        <div className="actionButtons">
          <Button
            fluid
            content='Delete Car'
            color="red"
            basic
            onClick={() => setDeleteModal(true)} />

          <Button
            fluid
            content='Permissions'
            color="teal"
            basic
            onClick={() => setPermissionsModalActive(true)} />
        </div>
      )}

      <Divider />

      {editMode 
      ? (
          <Form>
            <Form.Group widths='equal'>

              <Form.Input
                name="Year"
                type="number"
                label='Year'
                onChange={formik.handleChange}
                value={formik.values.Year} />

              <Form.Input
                name="Brand"
                type="text"
                label='Brand'
                onChange={formik.handleChange}
                value={formik.values.Brand} />

              <Form.Input
                name="Model"
                type="text"
                label='Model'
                onChange={formik.handleChange}
                value={formik.values.Model} />
            </Form.Group>

            <Form.Group inline style={{lineHeight: '45px'}}>
              <Form.Input
                name="Cost"
                type="number"
                step="any"
                label='Cost'
                onChange={formik.handleChange}
                value={formik.values.Cost} />
              
              <Form.Checkbox
                toggle
                label='Clean Title'
                id="CleanTitle"
                name="CleanTitle"
                checked={formik.values.CleanTitle}
                onChange={formik.handleChange} />
            </Form.Group> 

            <Form.Group widths="equal">
              <Form.TextArea
                  name="Notes"
                  label='Notes'
                  onChange={formik.handleChange}
                  value={formik.values.Notes} />
            </Form.Group>

        </Form>
        )
      : (
          <Table definition unstackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="left" width={5}>Year</Table.Cell>
                <Table.Cell textAlign="center">
                  {Year}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Brand</Table.Cell>
                <Table.Cell textAlign="center">
                  {Brand}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Model</Table.Cell>
                <Table.Cell textAlign="center">
                  {Model}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Cost</Table.Cell>
                <Table.Cell textAlign="center">
                  {numeral(Cost).format('$0,0.00')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Clean Title</Table.Cell>
                <Table.Cell textAlign="center">
                  {CleanTitle ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Notes</Table.Cell>
                <Table.Cell textAlign="center" style={{whiteSpace: 'pre'}}>
                  {Notes}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )
      }

      {deleteModal && (
        <DeleteModal
          carInfoId={Id}
          show={deleteModal}
          close={() => setDeleteModal(false)} />
      )}

      {permissionsModalActive && (
        <PermissionsModal
          carInfoId={Id}
          show={permissionsModalActive}
          close={() => setPermissionsModalActive(false)} />
      )}
    </InformationStyle>
  );
}

export default AddCarForm;