import * as TYPES from '../../types';

const initialState = {
  staffs: [
    {
      dob: '2022-09-08T00:00:00.000Z',
      email: 'michael@nurse.com',
      first_name: 'Michael',
      last_name: 'Hale',
      permission_flag: 4,
      phone_number: '234654654645',
      role: 'PHARMACIST'
    }
  ],
  selectedStaff: {}
};

interface Payload {
  type: string;
  data: any;
}

const staffsReducer = (state = initialState, action: Payload) => {
  switch (action.type) {
    case TYPES.SET_STAFFS:
      return {
        ...state,
        staffs: action.data
      };

    case TYPES.SET_SELECTED_STAFF:
      return {
        ...state,
        selectedStaff: action.data
      };

    default:
      return state;
  }
};

export default staffsReducer;
