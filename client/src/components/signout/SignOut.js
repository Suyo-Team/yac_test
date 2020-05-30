/**
 * Logs users out and clear the cookies. It'll redirect to login page
 */

import { useHistory } from 'react-router-dom';
import { removeUser, removeToken } from '../CheckUserAuthenticated';

export default function SignOut() {

    const history = useHistory();

    // Remove the cookies
    removeUser();
    removeToken();

    // Redirect to login page
    history.push('/login');

    return null;
}