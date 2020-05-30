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
import { setClientToken } from './APIKit';
import axios from 'axios';

export default function CheckUserAuthenticated(props) {

    let history = useHistory();
    const user_cookie = getUser();
    const token_cookie = getToken();
    const location = useLocation();

    const excluded_paths = ['/login', '/register', '/logout']
    if (!excluded_paths.includes(location.pathname)) {
        if (user_cookie === undefined) {
            history.push('/login');
            return null;
        }
        if (location.pathname === '/') {
            history.push(props.redirect);
            return null;
        }
    }
    
    console.log('here')
    setClientToken(token_cookie);

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
    const cookies = new Cookies();
    return cookies.get('token');
}

export function removeToken() {
    const cookies = new Cookies();
    cookies.remove('token');
}