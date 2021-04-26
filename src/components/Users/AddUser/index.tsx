import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import { createUserSaga } from '../actions';
import { Users } from '../../../models/users';

export const AddUser: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    (values: Users.PostRequest) => {
      dispatch(createUserSaga({ values, handleClose }));
    },
    [handleClose],
  );

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
  } = useForm<Users.PostRequest>({ resolver: yupResolver(schema) });

  const formFields: Array<Users.IField> = useMemo(
    () => [
      {
        name: 'email',
        component: (field) => (
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
        component: (field) => (
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
        component: (field) => (
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
        component: (field) => (
          <FormControl error={!!errors.website} fullWidth>
            <InputLabel id='demo-simple-select-error-label'>Role</InputLabel>
            <Select
              {...field}
              labelId='demo-simple-select-error-label'
              id='demo-simple-select-error'
            >
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='user'>User</MenuItem>
            </Select>
            <FormHelperText>{errors.website?.message}</FormHelperText>
          </FormControl>
        ),
      },
      {
        name: 'phone',
        component: (field) => (
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
    ],
    [],
  );

  return (
    <>
      <Button variant='contained' onClick={handleOpen}>
        Add User
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add User</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {formFields.map((item) => (
              <Controller
                key={item.name}
                name={item.name}
                control={control}
                defaultValue=''
                render={({ field }) => item.component(field)}
              />
            ))}
          </DialogContent>

          <DialogActions>
            <Button type='button' onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
