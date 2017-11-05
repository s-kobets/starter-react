import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import { stepForm } from '../components/Menu/ducks'

const rootReducer = combineReducers({
  stepForm,
  form: formReducer
});

const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => {
  store.getState();
});

export default store