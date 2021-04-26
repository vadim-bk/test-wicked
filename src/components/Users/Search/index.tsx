import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../selectors';
import { Users } from '../../../models/users';
import { getUsersSaga, setUsers } from '../actions';
import { useDebounce } from '../../../hooks/useDebounce';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const filteredUsers = useMemo(() => {
    return users?.filter((user: Users.User) => {
      const userString = JSON.stringify(user).toLowerCase();
      const include = userString.includes(debouncedSearch.toLowerCase());
      if (include) return user;
    });
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch && filteredUsers) {
      dispatch(setUsers(filteredUsers));
    } else {
      dispatch(getUsersSaga());
    }
  }, [debouncedSearch, filteredUsers]);

  const handleChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(value);
    },
    [],
  );

  return (
    <InputBase
      placeholder='Search…'
      inputProps={{ 'aria-label': 'search' }}
      onChange={handleChange}
    />
  );
};
