import * as TYPES from '../../types';

const initialState = {
  admin: {
    access_token: 'eyJhbGcMiOiIzcmQzYiLCest_5H3MFYc',
    address: '3rd street',
    admin_id: '1UuHpaL4U',
    email: 'guest@guest.com',
    name_of_institution: 'Guest Health',
    permission_flag: 2,
    phone_number: '23312344444',
    registration_number: '56756754354',
    stream_user_id: '945e06a9792387e0376f6',
    stream_user_token: 'eyJhU77jGB5fqgTU',
    subscription_permission_flag: 1,
    _id: '62f8c6e2746d59ed2afc537a'
  },
  adminSession: {}
};

interface Payload {
  type: string;
  data: any;
}

const adminReducer = (state = initialState, action: Payload) => {
  // setAdmin's personal data
  switch (action.type) {
    case TYPES.SET_ADMIN:
      return {
        ...state,
        admin: action.data
      };

    case TYPES.SET_ADMIN_SESSION:
      return {
        ...state,
        adminSession: action.data
      };

    default:
      return state;
  }
};

export default adminReducer;
