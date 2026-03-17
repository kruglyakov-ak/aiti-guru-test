import type { RootState } from '@/entities/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  remember: boolean;
}

const initialState: AuthState = {
  token: null,
  remember: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string; remember: boolean }>) => {
      const { token, remember } = action.payload;
      state.token = token;
      state.remember = remember;

      if (remember) {
        localStorage.setItem('token', token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('token');
      }
    },
    logout: (state) => {
      state.token = null;
      state.remember = false;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state: RootState) => state.auth.token;