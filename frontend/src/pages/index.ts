import { connect } from 'react-redux';
import Login from '../modules/login';
import {
  login,
  register,
  set_null_error,
} from '../reducers/user/actions';
import { AppState } from '../redux/store';

const mapStateToProps = (state: AppState) => {
  return {
    name: state.userReducer.name,
    code: state.userReducer.key,
    error: state.userReducer.error,
  };
};

const mapDispatchToProps = {
  login,
  register,
  set_null_error,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
