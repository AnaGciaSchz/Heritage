import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { fetchWrapper } from '../pages/api/handlers/fetchWrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    getAll
};

function login(dataMap) {
    return fetchWrapper.post(`${baseUrl}/api/admin/login`, Array.from(dataMap.entries()))
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            console.log("user:")
            console.log(user)
            localStorage.setItem('username', "Ña");
            Router.reload(window.location.pathname)
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    userSubject.next(null);
    Router.reload(window.location.pathname)
    Router.push('/');
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}