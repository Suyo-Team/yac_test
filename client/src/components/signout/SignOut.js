import { useHistory } from 'react-router-dom';
import { removeUser } from '../CheckUserAuthenticated';

export default function SignOut() {
    // Simply remove the cookie with user info and redirects to 'login' page
    const history = useHistory();
    removeUser()
    history.push('/login');

    return null;
}