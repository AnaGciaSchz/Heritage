import getConfig from 'next/config';
import Router from 'next/router'
import cookieCutter from 'cookie-cutter'

import { fetchWrapper } from '../pages/api/handlers/fetchWrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const userService = {
    login,
    logout,
    getAll
};

function login(dataMap) {
    return fetchWrapper.post(`${baseUrl}/admin/login`, Array.from(dataMap.entries()))
        .then(async (response) => {
            var userPromise = await response.text();
            var userObject = JSON.parse(userPromise);
            cookieCutter.set('heritageToken', userObject.token)
            cookieCutter.set('userName', userObject.username)
            Router.push('/');
            return response;
        });
}

function logout() {
    cookieCutter.set('heritageToken', '', { expires: new Date(0) })
    cookieCutter.set('userName', '', { expires: new Date(0) })
    Router.reload(window.location.pathname)
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}