const initialState = {
  listForm: ['Личные данные', 'Номер банковской карты', 'Завершение'],
  activeForm: 0,
  finishForm: 0
}

export function stepForm(state=initialState, action) {
  switch (action.type) {
    case 'setActiveForm':
      return {...state, activeForm: action.amount};
    default:
      return state;
  }
}

export function setActiveForm(value) {
  return {
    type: 'setActiveForm',
    amount: value
  }
}


export const actions = {
  setActiveForm
}