import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Dimmer,
  Divider,
  Header,
  Form,
  Icon,
  Loader,
} from 'semantic-ui-react';
import { useFormik } from 'formik';
import { every } from 'lodash';

import { createCar } from '../../endpoints/index';
import { useActiveUser } from '../../context/ActiveUserContext';

const AddCarForm = (props) => {
  const {
    Brand,
    CleanTitle,
    Cost,
    Model,
    Notes,
    Year,
  } = props;

  const [submitLoading, setSubmitLoading] = useState(false);

  const activeUser = useActiveUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Year,
      Brand,
      Model,
      Cost,
      CleanTitle,
      Notes,
    },
    onSubmit: (values) => {
      setSubmitLoading(true);
      createCar(values)
        .then(({ data: carId }) => navigate(`/home/mycarlist/${activeUser.Id}/${carId}/info`), // change 1003 to actual ID, this isnt breaking amnythin at the moment
      );
    },
  });

  const pass = every(formik.values, (value, key) => value !== '' || key === 'Notes');

  return (
    submitLoading
      ? (
        <div>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </div>
      )
      : (
        <div>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="file alternate outline" />
              Car Information
            </Header>
          </Divider>

          <Form>
            <Form.Group widths="equal">

              <Form.Input
                name="Year"
                type="number"
                label="Year"
                onChange={formik.handleChange}
                value={formik.values.Year}
              />

              <Form.Input
                name="Brand"
                type="text"
                label="Brand"
                onChange={formik.handleChange}
                value={formik.values.Brand}
              />

              <Form.Input
                name="Model"
                type="text"
                label="Model"
                onChange={formik.handleChange}
                value={formik.values.Model}
              />
            </Form.Group>

            <Form.Group inline style={{ lineHeight: '45px' }}>
              <Form.Input
                name="Cost"
                type="number"
                label="Cost"
                step="any"
                onChange={formik.handleChange}
                value={formik.values.Cost}
              />

              <Form.Checkbox
                toggle
                label="Clean Title"
                id="CleanTitle"
                name="CleanTitle"
                checked={formik.values.CleanTitle}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.TextArea
                name="Notes"
                label="Notes"
                onChange={formik.handleChange}
                value={formik.values.Notes}
              />
            </Form.Group>

            <Button
              basic
              fluid
              disabled={!pass}
              color="teal"
              content="Save"
              type="button"
              onClick={formik.handleSubmit}
            />

          </Form>
        </div>
      )
  );
};

AddCarForm.propTypes = {
  // parent
  Brand: PropTypes.string,
  CleanTitle: PropTypes.bool,
  Cost: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  Model: PropTypes.string,
  Notes: PropTypes.string,
  Year: PropTypes.string,
};

AddCarForm.defaultProps = {
  Brand: '',
  CleanTitle: true,
  Cost: '',
  history: {},
  Model: '',
  Notes: '',
  Year: '',
};

export default AddCarForm;
