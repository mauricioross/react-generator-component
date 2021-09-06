import {
  GET_TEMPLATE,
  GET_TEMPLATE_SUCCESS,
  SET_TEMPLATE,
  GET_TEMPLATE_FAILURE,
} from './TemplateAction';

const initialState = {
}

export const templateReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TEMPLATE_SUCCESS:{
      return Object.assign({}, state, {sectionA: action.response});
    }
    case SET_TEMPLATE:{
      return Object.assign({}, state, action.data);
    }
    default:
      return state;
  }
};