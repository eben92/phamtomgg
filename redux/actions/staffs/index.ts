import * as TYPES from '../../types';

export const setStaff = (data: any) => ({
  type: TYPES.SET_STAFFS,
  data
});

export const setSelectedStaff = (data: any) => ({
  type: TYPES.SET_SELECTED_STAFF,
  data
});
