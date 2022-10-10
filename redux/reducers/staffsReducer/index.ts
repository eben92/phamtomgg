import * as TYPES from '../../types';

const initialState = {
  staffs: [],
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
