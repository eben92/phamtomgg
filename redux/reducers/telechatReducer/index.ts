import * as TYPES from '../../types';

const initialState = {
  draft: '',
  messages: []
};

interface Payload {
  type: string;
  data: any;
}

const telechatReducer = (state = initialState, action: Payload) => {
  switch (action.type) {
    case TYPES.SET_DRAFT:
      return {
        ...state,
        draft: action.data
      };

    case TYPES.SET_MESSAGES:
      return {
        ...state,
        messages: action.data
      };

    default:
      return state;
  }
};

export default telechatReducer;
