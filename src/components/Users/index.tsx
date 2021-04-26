import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { useTimer } from 'use-timer';
import { Button, Grid } from '@material-ui/core';

import { Table } from './Table';
import { Search } from './Search';
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';
import { RemoveUser } from './RemoveUser';
import { getUsers, getRemovedUser } from './selectors';
import { Users as UsersNamespace } from '../../models/users';
import { getUsersSaga, removeUserSaga, setRemovedUser } from './actions';

export const Users: React.FC = () => {
  const [showCancelBtn, setShowCancelBtn] = useState<boolean>(false);

  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const removedUser = useSelector(getRemovedUser);

  const { time, start, reset } = useTimer({
    initialTime: 10,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    dispatch(getUsersSaga());
  }, []);

  useEffect(() => {
    if (removedUser) {
      start();
      setShowCancelBtn(true);
    }
  }, [removedUser]);

  useEffect(() => {
    if (time === 0) {
      dispatch(removeUserSaga(removedUser?.id));
      setShowCancelBtn(false);
    }
  }, [time, removedUser]);

  const restartTimer = useCallback(
    (id: number) => {
      dispatch(removeUserSaga(id));
      reset();
      start();
    },
    [reset, start],
  );

  const handleCancelRemove = useCallback(() => {
    reset();
    setShowCancelBtn(false);
    dispatch(setRemovedUser(null));
    dispatch(getUsersSaga());
  }, [reset]);

  const columns = useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'First Name',
        accessor: 'name',
      },
      {
        Header: 'Last Name',
        accessor: 'username',
      },
      {
        Header: 'Role',
        accessor: 'website',
      },
      {
        Header: 'Company Role',
        accessor: 'phone',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row: { original } }: Cell<UsersNamespace.User>) => (
          <>
            <EditUser user={original} />
            <RemoveUser user={original} restartTimer={restartTimer} />
          </>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <p>Users ({users?.length})</p>

      {showCancelBtn && (
        <Grid>
          <Button variant='contained' color='secondary' onClick={handleCancelRemove}>
            Cancel ({time})
          </Button>
        </Grid>
      )}

      <Search />

      <AddUser />

      {users?.length ? (
        <Table columns={columns} data={users} />
      ) : (
        <div>Not found any data for this request.</div>
      )}
    </>
  );
};
