import getConfig from 'next/config';
import cookieCutter from 'cookie-cutter'

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

async function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return await fetch(url, requestOptions);
}

async function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
     var response = await fetch(url, requestOptions);
     return response
}

async function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return await fetch(url, requestOptions);    
}

async function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return await fetch(url, requestOptions);
}


function authHeader(url) {
    const user = cookieCutter.get('userName');
    const token = cookieCutter.get('heritageToken');
    const isLoggedIn = user!==undefined && token!==undefined;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}