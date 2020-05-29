/**
 * Author: edraobdu
 * 
 * This Wrapper component will check for a cookie named 'user' with user information
 * if that cookie is not specified, that means the user is not authenticated
 * 
 * When user is Authenticated already, we continue rendering the page
 * if it's not, we redirect to '/login' page, or we can specify a redirect property 
 * in the component
 * 
 * Important! This component must always be used after defining a 'Router', so
 * we can use the 'useHistory' hook
 */

import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';


export default function CheckUserAuthenticated(props) {

    let history = useHistory();
    const user_cookie = getUser();
    const location = useLocation();

    const excluded_paths = ['/login', '/register', '/logout']
    if (!excluded_paths.includes(location.pathname)) {
        if (user_cookie === undefined) {
            history.push('/login');
            return null;
        }    
        if (props.redirect && props.redirect !== location.pathname) {
            history.push(props.redirect);
            return null;
        }
    }
    // Here we could update a global state with redux, with user information
    // but, for right now, let's get that info directly from the cookie on evry page

    return props.children
    
}

export function getUser() {
    // gets the user information from the cookie
    const cookies = new Cookies();
    return cookies.get('user');    
}

export function removeUser() {
    /// remove the cookie with user information
    const cookies = new Cookies();
    cookies.remove('user');
}