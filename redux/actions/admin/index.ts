import * as TYPES from '../../types';

export const setAdmin = (data: any) => ({
  type: TYPES.SET_ADMIN,
  data
});

export const setAdminSession = (data: any) => ({
  type: TYPES.SET_ADMIN_SESSION,
  data
});
