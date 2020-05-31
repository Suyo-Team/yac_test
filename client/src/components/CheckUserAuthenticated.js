/**
 * Author: edraobdu
 * 
 * This Wrapper component will check for a cookie named 'user' with user information
 * if that cookie is not specified, that means the user is not authenticated
 * 
 * When user is Authenticated already, we continue rendering the page
 * if it's not, we redirect to '/login' page
 * 
 * Important! This component must always be used after defining a 'Router', so
 * we can use the 'useHistory' hook
 */

import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import APIKit, { setClientToken } from './APIKit';

export default function CheckUserAuthenticated(props) {
    // Checks for user information in the cookies, including the token if
    // it is already authenticated.

    let history = useHistory();
    const location = useLocation();

    // Get the user info from cookie
    const user_cookie = getUser();
    // Get the tocken authentication from cookie
    const token_cookie = getToken();

    // Path that must be excluded when trying to 
    // redirect to Anonymous users to the login page
    const excluded_paths = ['/login', '/register', '/logout'];

    if (!excluded_paths.includes(location.pathname)) {

        if (user_cookie === undefined) {
            // If user is not logged in, we redirect to the login page
            history.push('/login');
            return null;
        }

        if (location.pathname === '/') {
            // When entering the home page '/', we redirect to the path 
            // specifiedin the props 'redirect'
            history.push(props.redirect);
            return null;
        }
    }
    
    // As axios loses some headers when pages are reloaded, we set
    // the token authorization header in axios to include it in subsecuent 
    // API calls
    if (token_cookie) {
        setClientToken(token_cookie);
    }    

    // Return the wrapped component
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

export function getToken() {
    // Get tocken from cookie
    const cookies = new Cookies();
    return cookies.get('token');
}

export function removeToken() {
    // Remove token from cookie
    const cookies = new Cookies();
    cookies.remove('token');
}