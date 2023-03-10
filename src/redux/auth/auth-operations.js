import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', userData);

      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue('Bad Request');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',

  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/login', user);

      token.set(data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('users/logout');
      token.unSet();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const tokenLS = getState().auth.token;

    if (!tokenLS) {
      return rejectWithValue('Not Token');
    }
    token.set(tokenLS);
    try {
      const { data } = await axios('users/current');

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
