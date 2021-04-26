import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { Users } from '../../../models/users';
import { setRemovedUser, setUsers } from '../actions';
import { getRemovedUser, getUsers } from '../selectors';

interface IRemoveUser {
  user: Users.User;
  restartTimer: (id: number) => void;
}

export const RemoveUser: React.FC<IRemoveUser> = (props) => {
  const { user, restartTimer } = props;

  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const removedUser = useSelector(getRemovedUser);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(setUsers(users?.filter((item: Users.User) => item.id !== user.id)));
    dispatch(setRemovedUser(user));
    handleClose();

    if (removedUser) {
      restartTimer(removedUser?.id);
    }
  }, [handleClose, removedUser, restartTimer]);

  const { control, handleSubmit } = useForm<Users.PostRequest>();

  const formFields: Array<Users.IFieldRemove> = useMemo(
    () => [
      {
        name: 'email',
        component: (
          <TextField disabled id='standard-disabled' label='Email' defaultValue={user.email} />
        ),
      },
      {
        name: 'name',
        component: (
          <TextField disabled id='standard-disabled' label='First Name' defaultValue={user.name} />
        ),
      },
      {
        name: 'username',
        component: (
          <TextField
            disabled
            id='standard-disabled'
            label='Last Name'
            defaultValue={user.username}
          />
        ),
      },
      {
        name: 'website',
        component: (
          <TextField disabled id='standard-disabled' label='Role' defaultValue={user.website} />
        ),
      },
      {
        name: 'phone',
        component: (
          <TextField
            disabled
            id='standard-disabled'
            label='Company Role'
            defaultValue={user.phone}
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth='md'>
        <DialogTitle id='form-dialog-title'>Remove User</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container>
              {formFields.map((item) => (
                <Grid item key={item.name}>
                  <Controller name={item.name} control={control} render={() => item.component} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button type='button' onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
