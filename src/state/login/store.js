import { createStore } from 'redux';
import reducer from './reducer';

const LoginStore = createStore(reducer);

export default LoginStore;
