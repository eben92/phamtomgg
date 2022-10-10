import * as TYPES from '../../types';

export const setDraft = (data: string) => ({
  type: TYPES.SET_DRAFT,
  data
});

export const setMessages = (data: any) => ({
  type: TYPES.SET_MESSAGES,
  data
});
