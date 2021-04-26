import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, Field, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { Users } from '../../../models/users';
import { createUserSaga } from '../actions';

interface IEditUser {
  user: Users.User;
}

export const EditUser: React.FC<IEditUser> = (props) => {
  const { user } = props;

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = (values: Users.PostRequest) => {
    dispatch(createUserSaga({ values, handleClose }));
  };

  const schema = yup.object().shape({
    email: yup.string().required(),
    name: yup.string().required().max(255, 'Max length 255 symbols'),
    username: yup.string().required().max(255, 'Max length 255 symbols'),
    website: yup.string().required(),
    phone: yup.string().required().max(255, 'Max length 255 symbols'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Users.PostRequest>({
    resolver: yupResolver(schema),
  });

  const formFields: Array<Users.IField> = [
    {
      name: 'email',
      component: (field: Field) => (
        <TextField
          {...field}
          margin='dense'
          fullWidth
          type='text'
          label='Email'
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      ),
    },
    {
      name: 'name',
      component: (field: Field) => (
        <TextField
          {...field}
          margin='dense'
          fullWidth
          type='text'
          label='First Name'
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      ),
    },
    {
      name: 'username',
      component: (field: Field) => (
        <TextField
          {...field}
          margin='dense'
          fullWidth
          type='text'
          label='Last Name'
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      ),
    },
    {
      name: 'website',
      component: (field: Field) => (
        <FormControl error={!!errors.website} fullWidth>
          <InputLabel id='demo-simple-select-error-label'>Role</InputLabel>
          <Select {...field} labelId='demo-simple-select-error-label' id='demo-simple-select-error'>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='user'>User</MenuItem>
          </Select>
          <FormHelperText>{errors.website?.message}</FormHelperText>
        </FormControl>
      ),
    },
    {
      name: 'phone',
      component: (field: Field) => (
        <TextField
          {...field}
          margin='dense'
          fullWidth
          type='text'
          label='Company Role'
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
      ),
    },
  ];

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {formFields.map((item) => (
              <Controller
                key={item.name}
                name={item.name}
                control={control}
                defaultValue={user[item.name]}
                render={({ field }) => item.component(field)}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
